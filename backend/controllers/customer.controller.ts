import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { SavedProperty } from '../models/SavedProperty.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class CustomerController {
  static async getSavedProperties(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const saved = await SavedProperty.find({ user: req.user!._id }).populate('property');
      return sendSuccess(res, 'Saved properties fetched successfully', saved);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch saved properties', 500);
    }
  }

  static async saveProperty(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { propertyId } = req.body;
      const saved = await SavedProperty.create({ user: req.user!._id, property: propertyId });
      return sendSuccess(res, 'Property saved successfully', saved, 201);
    } catch (error: any) {
      return sendError(res, 'Property already saved or invalid ID', 400);
    }
  }

  static async removeSavedProperty(req: AuthRequest, res: Response): Promise<Response> {
    try {
      await SavedProperty.deleteOne({ user: req.user!._id, property: req.params.propertyId });
      return sendSuccess(res, 'Property removed from saved list', null);
    } catch (error: any) {
      return sendError(res, 'Failed to remove saved property', 400);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { name, phone, profileImage } = req.body;
      const updated = await User.findByIdAndUpdate(
        req.user!._id,
        { name, phone, profileImage },
        { new: true }
      );
      return sendSuccess(res, 'Profile updated successfully', updated);
    } catch (error: any) {
      return sendError(res, 'Failed to update profile', 400);
    }
  }
}
