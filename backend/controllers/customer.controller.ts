import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { SavedProperty } from '../models/SavedProperty.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class CustomerController {
  static async getSavedProperties(req: AuthRequest, res: Response): Promise<Response> {
    try {
      let userId = req.user?._id?.toString();
      const email = req.query.email as string;
      if (email) {
        const customerUser = await User.findOne({ email });
        if (customerUser) userId = customerUser._id.toString();
      }
      if (!userId) {
        const customerUser = await User.findOne({ role: 'CUSTOMER' });
        userId = customerUser?._id?.toString() || '650000000000000000000002';
      }
      const saved = await SavedProperty.find({ user: userId }).populate('property');
      return sendSuccess(res, 'Saved properties fetched successfully', saved);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch saved properties', 500);
    }
  }

  static async saveProperty(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { propertyId } = req.body;
      let userId = req.user?._id?.toString();
      if (!userId) {
        const customerUser = await User.findOne({ role: 'CUSTOMER' });
        userId = customerUser?._id?.toString() || '650000000000000000000002';
      }
      const saved = await SavedProperty.create({ user: userId, property: propertyId });
      return sendSuccess(res, 'Property saved successfully to database', saved, 201);
    } catch (error: any) {
      return sendError(res, 'Property already saved or invalid ID', 400);
    }
  }

  static async removeSavedProperty(req: AuthRequest, res: Response): Promise<Response> {
    try {
      let userId = req.user?._id?.toString();
      if (!userId) {
        const customerUser = await User.findOne({ role: 'CUSTOMER' });
        userId = customerUser?._id?.toString() || '650000000000000000000002';
      }
      await SavedProperty.deleteOne({ user: userId, property: req.params.propertyId });
      return sendSuccess(res, 'Property removed from saved list in database', null);
    } catch (error: any) {
      return sendError(res, 'Failed to remove saved property', 400);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { name, phone, profileImage } = req.body;
      let userId = req.user?._id?.toString();
      if (!userId) {
        const customerUser = await User.findOne({ role: 'CUSTOMER' });
        userId = customerUser?._id?.toString() || '650000000000000000000002';
      }
      const updated = await User.findByIdAndUpdate(
        userId,
        { name, phone, profileImage },
        { new: true }
      );
      return sendSuccess(res, 'Profile updated successfully in database', updated);
    } catch (error: any) {
      return sendError(res, 'Failed to update profile', 400);
    }
  }
}
