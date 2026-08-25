import { Request, Response } from 'express';
import { InquiryService } from '../services/inquiry.service.js';
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
      const payload = {
        ...req.body,
        customer: req.user ? req.user._id : undefined,
      };
      const inquiry = await InquiryService.createInquiry(payload);
      return sendSuccess(res, 'Inquiry submitted successfully', inquiry, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to submit inquiry', 400);
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { status, adminNotes } = req.body;
      const inquiry = await InquiryService.updateInquiryStatus(req.params.id, status, adminNotes);
      return sendSuccess(res, 'Inquiry status updated successfully', inquiry);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update inquiry status', 400);
    }
  }
}
