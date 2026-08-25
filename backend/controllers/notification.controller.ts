import { Response } from 'express';
import { NotificationService } from '../services/notification.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class NotificationController {
  static async getUserNotifications(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const notifications = await NotificationService.getUserNotifications(req.user!._id.toString());
      return sendSuccess(res, 'Notifications fetched successfully', notifications);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch notifications', 500);
    }
  }

  static async markAsRead(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const updated = await NotificationService.markAsRead(req.params.id, req.user!._id.toString());
      return sendSuccess(res, 'Notification marked as read', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to mark notification as read', 400);
    }
  }
}
