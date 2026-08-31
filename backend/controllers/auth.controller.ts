import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = await AuthService.registerCustomer(req.body);
      return sendSuccess(res, 'User registered successfully', result, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Registration failed', 400);
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return sendSuccess(res, 'Login successful', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Authentication failed', 401);
    }
  }

  static async getMe(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const user = req.user ? AuthService.sanitizeUser(req.user) : null;
      return sendSuccess(res, 'Current user profile fetched', { user });
    } catch (error: any) {
      return sendError(res, 'Failed to fetch user profile', 500);
    }
  }

  static async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
      return sendSuccess(res, 'Users fetched successfully', users);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch users', 500);
    }
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, role, password, status } = req.body;
      const existing = await User.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return sendError(res, 'User with this email already exists', 400);
      }

      let agentCode = undefined;
      if (role === 'AGENT') {
        const count = await User.countDocuments({ role: 'AGENT' });
        agentCode = req.body.agentCode || `BH-AGT-${101 + count}`;
      }

      const newUser = await User.create({
        name,
        email: email.toLowerCase().trim(),
        phone: phone || '+91 98765 00000',
        password: password || '$2a$10$e842d731467cb74109c8d',
        role: role || 'CUSTOMER',
        agentCode,
        isActive: status !== 'INACTIVE',
      });
      return sendSuccess(res, 'User account created successfully in database', newUser, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create user', 400);
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, phone, role, status, isActive } = req.body;
      const updateData: any = {};
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (role) updateData.role = role;
      if (status !== undefined) updateData.isActive = status === 'ACTIVE';
      if (isActive !== undefined) updateData.isActive = Boolean(isActive);

      const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
      return sendSuccess(res, 'User updated successfully in database', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update user', 400);
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      await User.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() });
      return sendSuccess(res, 'User account deleted successfully from database', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete user', 400);
    }
  }
}
