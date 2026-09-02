import { Response } from 'express';
import { SiteVisitService } from '../services/siteVisit.service.js';
import { User } from '../models/User.js';
import { Property } from '../models/Property.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import mongoose from 'mongoose';

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
      const userEmail = req.body.email || req.body.customerEmail;
      const userName = req.body.customerName || req.body.name;
      const userPhone = req.body.customerPhone || req.body.phone;
      const propTitle = req.body.propertyName || req.body.property;

      if (userEmail) {
        const foundUser = await User.findOne({ email: userEmail });
        if (foundUser) customerId = foundUser._id.toString();
      }

      let propertyId = req.body.property;
      if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) {
        const prop = await Property.findOne({ title: new RegExp(propTitle || '', 'i') }) || await Property.findOne();
        propertyId = prop?._id?.toString();
      }

      const siteVisit = await SiteVisitService.createSiteVisit({
        ...req.body,
        customer: customerId && mongoose.Types.ObjectId.isValid(customerId) ? customerId as any : undefined,
        property: propertyId && mongoose.Types.ObjectId.isValid(propertyId) ? propertyId as any : undefined,
        customerEmail: userEmail,
        customerName: userName,
        customerPhone: userPhone,
        propertyName: propTitle,
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

  static async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const siteVisit = await SiteVisitService.deleteSiteVisit(req.params.id);
      return sendSuccess(res, 'Site visit deleted successfully', siteVisit);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete site visit', 400);
    }
  }
}
