import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { InquiryService } from '../services/inquiry.service.js';
import { User, IUser } from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class InquiryController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await InquiryService.getAllInquiries(req.query);
      return sendSuccess(res, 'Inquiries fetched successfully', result.inquiries, 200, result.pagination);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch inquiries', 500);
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      let user: IUser | undefined = req.user;

      // Optional authentication check for logged-in session submitters
      if (!user && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        try {
          const decoded = verifyToken(token);
          const found = await User.findById(decoded.id);
          if (found && !found.isDeleted && found.isActive) {
            user = found;
          }
        } catch (err) {}
      }

      let propertyId = req.body.property;
      if (propertyId && typeof propertyId === 'string' && !mongoose.Types.ObjectId.isValid(propertyId)) {
        propertyId = undefined;
      }

      const name = (req.body.name || req.body.customerName || (user ? user.name : 'Customer')).trim();
      const email = (req.body.email || (user ? user.email : 'visitor@bhavyahomes.com')).toLowerCase().trim();
      const phone = (req.body.phone || (user ? user.phone : '+91 98765 00000')).trim();
      const message = (req.body.message || 'General Inquiry / Site Visit Request').trim();

      const payload = {
        ...req.body,
        name,
        email,
        phone,
        message,
        property: propertyId,
        customer: user ? user._id : undefined,
      };

      const inquiry = await InquiryService.createInquiry(payload);
      return sendSuccess(res, 'Inquiry submitted successfully and stored in database', inquiry, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to submit inquiry', 400);
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const inquiry = await InquiryService.updateInquiryStatus(req.params.id, req.body);
      return sendSuccess(res, 'Inquiry record updated successfully', inquiry);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update inquiry record', 400);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      await InquiryService.deleteInquiry(req.params.id);
      return sendSuccess(res, 'Inquiry deleted successfully from database', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete inquiry record', 400);
    }
  }
}
