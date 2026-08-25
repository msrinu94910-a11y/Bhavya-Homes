import { Request, Response } from 'express';
import { CMSContent } from '../models/CMSContent.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class CMSController {
  static async getByKey(req: Request, res: Response): Promise<Response> {
    try {
      const content = await CMSContent.findOne({ key: req.params.key.toUpperCase(), isPublished: true });
      if (!content) return sendError(res, 'Content key not found', 404);
      return sendSuccess(res, 'CMS Content fetched', content);
    } catch (error: any) {
      return sendError(res, error.message || 'Error fetching CMS content', 500);
    }
  }

  static async updateKey(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const key = req.params.key.toUpperCase();
      const content = await CMSContent.findOneAndUpdate(
        { key },
        { ...req.body, key, updatedBy: req.user!._id },
        { new: true, upsert: true }
      );
      return sendSuccess(res, 'CMS Content updated', content);
    } catch (error: any) {
      return sendError(res, error.message || 'Error updating CMS content', 400);
    }
  }
}
