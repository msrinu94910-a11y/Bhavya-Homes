import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AnalyticsController {
  static async getStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await AnalyticsService.getDashboardStats();
      return sendSuccess(res, 'Analytics stats fetched successfully', stats);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch analytics', 500);
    }
  }
}
