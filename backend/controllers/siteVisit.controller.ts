import { Response } from 'express';
import { SiteVisitService } from '../services/siteVisit.service.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class SiteVisitController {
  static async getAll(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const result = await SiteVisitService.getAllSiteVisits(req.query);
      return sendSuccess(res, 'Site visits fetched successfully', result.siteVisits, 200, result.pagination);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch site visits', 500);
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      let customerId = req.user?._id?.toString();
      if (!customerId) {
        const user = await User.findOne({ role: 'CUSTOMER' });
        customerId = user?._id?.toString() || '650000000000000000000002';
      }
      const siteVisit = await SiteVisitService.createSiteVisit({
        ...req.body,
        customer: customerId,
      });
      return sendSuccess(res, 'Site visit requested successfully', siteVisit, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to request site visit', 400);
    }
  }

  static async updateStatus(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const siteVisit = await SiteVisitService.updateSiteVisitStatus(req.params.id, req.body);
      return sendSuccess(res, 'Site visit updated successfully', siteVisit);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update site visit', 400);
    }
  }
}
