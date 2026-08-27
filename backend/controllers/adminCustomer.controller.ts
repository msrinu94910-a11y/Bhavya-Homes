import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserRole, UserStatus } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AdminCustomerController {
  /**
   * GET /api/admin/customers
   * Fetch all customers with search, status filter, and pagination
   */
  static async getCustomers(req: Request, res: Response): Promise<Response> {
    try {
      const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string, 10) || 20));
      const skip = (page - 1) * limit;

      const search = (req.query.search as string || '').trim();
      const statusFilter = (req.query.status as string || '').trim().toUpperCase();

      const query: any = {
        role: UserRole.CUSTOMER,
        isDeleted: { $ne: true },
      };

      if (statusFilter && statusFilter !== 'ALL') {
        query.status = statusFilter;
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
          { name: regex },
          { email: regex },
          { phone: regex },
        ];
      }

      const [customers, total] = await Promise.all([
        User.find(query)
          .select('-password')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments(query),
      ]);

      // Calculate live analytics metrics
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [totalCustomers, activeCustomers, inactiveCustomers, blockedCustomers, newThisMonth] = await Promise.all([
        User.countDocuments({ role: UserRole.CUSTOMER, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.CUSTOMER, status: UserStatus.ACTIVE, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.CUSTOMER, status: UserStatus.INACTIVE, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.CUSTOMER, status: UserStatus.BLOCKED, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.CUSTOMER, createdAt: { $gte: startOfMonth }, isDeleted: { $ne: true } }),
      ]);

      return sendSuccess(res, 'Customers fetched successfully', {
        customers,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit) || 1,
          limit,
        },
        analytics: {
          totalCustomers,
          activeCustomers,
          inactiveCustomers,
          blockedCustomers,
          newThisMonth,
        },
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch customers', 500);
    }
  }

  /**
   * GET /api/admin/customers/:id
   * Fetch single customer details
   */
  static async getCustomerById(req: Request, res: Response): Promise<Response> {
    try {
      const customer = await User.findOne({
        _id: req.params.id,
        role: UserRole.CUSTOMER,
        isDeleted: { $ne: true },
      }).select('-password');

      if (!customer) {
        return sendError(res, 'Customer not found', 404);
      }

      return sendSuccess(res, 'Customer details fetched successfully', customer);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch customer', 500);
    }
  }

  /**
   * POST /api/admin/customers
   * Admin endpoint to create new customer
   */
  static async createCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, password, status } = req.body;

      if (!name || !email || !phone) {
        return sendError(res, 'Name, email, and phone are required fields', 400);
      }

      const cleanEmail = email.toLowerCase().trim();
      const existing = await User.findOne({ email: cleanEmail, isDeleted: { $ne: true } });
      if (existing) {
        return sendError(res, 'A customer with this email address already exists', 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || 'Customer@123', salt);

      const customer = await User.create({
        name,
        email: cleanEmail,
        phone: phone.trim(),
        password: hashedPassword,
        role: UserRole.CUSTOMER,
        status: status || UserStatus.ACTIVE,
        isActive: status !== UserStatus.INACTIVE && status !== UserStatus.BLOCKED,
      });

      const sanitized = await User.findById(customer._id).select('-password');
      return sendSuccess(res, 'Customer registered successfully', sanitized, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create customer', 400);
    }
  }

  /**
   * PUT /api/admin/customers/:id
   * Update customer details & status
   */
  static async updateCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, status, isActive } = req.body;
      const customer = await User.findOne({ _id: req.params.id, isDeleted: { $ne: true } });

      if (!customer) {
        return sendError(res, 'Customer not found', 404);
      }

      if (email && email.toLowerCase().trim() !== customer.email) {
        const cleanEmail = email.toLowerCase().trim();
        const existing = await User.findOne({ email: cleanEmail, _id: { $ne: customer._id }, isDeleted: { $ne: true } });
        if (existing) {
          return sendError(res, 'Email address is already in use by another account', 400);
        }
        customer.email = cleanEmail;
      }

      if (name) customer.name = name.trim();
      if (phone) customer.phone = phone.trim();

      if (status) {
        const uppercaseStatus = status.toString().toUpperCase() as UserStatus;
        if (Object.values(UserStatus).includes(uppercaseStatus)) {
          customer.status = uppercaseStatus;
          customer.isActive = uppercaseStatus === UserStatus.ACTIVE;
        }
      } else if (isActive !== undefined) {
        customer.isActive = Boolean(isActive);
        customer.status = Boolean(isActive) ? UserStatus.ACTIVE : UserStatus.INACTIVE;
      }

      await customer.save();
      const updated = await User.findById(customer._id).select('-password');
      return sendSuccess(res, 'Customer record updated successfully', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update customer', 400);
    }
  }

  /**
   * DELETE /api/admin/customers/:id
   * Soft delete customer record
   */
  static async deleteCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const customer = await User.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
      if (!customer) {
        return sendError(res, 'Customer account not found', 404);
      }

      customer.isDeleted = true;
      customer.deletedAt = new Date();
      await customer.save();

      return sendSuccess(res, 'Customer deleted successfully', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete customer', 500);
    }
  }
}
