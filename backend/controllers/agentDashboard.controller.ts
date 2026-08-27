import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { User } from '../models/User.js';
import { Inquiry } from '../models/Inquiry.js';
import { Lead } from '../models/Lead.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AgentDashboardController {
  /**
   * GET /api/agent/dashboard
   * Scoped dashboard summary metrics for logged-in agent
   */
  static async getDashboardSummary(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentId = req.user?._id;
      if (!agentId) {
        return sendError(res, 'Not authorized', 401);
      }

      const [assignedCustomers, assignedLeads, assignedInquiries] = await Promise.all([
        User.countDocuments({ assignedAgent: agentId, isDeleted: { $ne: true } }),
        Lead.countDocuments({ assignedAgent: agentId, isDeleted: { $ne: true } }),
        Inquiry.countDocuments({ assignedAgent: agentId }),
      ]);

      return sendSuccess(res, 'Agent dashboard summary fetched successfully', {
        agentCode: req.user?.agentCode || 'BH-AGT-101',
        name: req.user?.name,
        assignedCustomers,
        assignedLeads,
        assignedInquiries,
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch agent dashboard summary', 500);
    }
  }

  /**
   * GET /api/agent/customers
   * Fetch ONLY customers assigned to logged-in agent
   */
  static async getAssignedCustomers(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentId = req.user?._id;
      if (!agentId) {
        return sendError(res, 'Not authorized', 401);
      }

      const customers = await User.find({
        assignedAgent: agentId,
        isDeleted: { $ne: true },
      }).select('-password').sort({ createdAt: -1 });

      return sendSuccess(res, 'Assigned customers fetched successfully', customers);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned customers', 500);
    }
  }

  /**
   * GET /api/agent/leads
   * Fetch ONLY leads assigned to logged-in agent
   */
  static async getAssignedLeads(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentId = req.user?._id;
      if (!agentId) {
        return sendError(res, 'Not authorized', 401);
      }

      const leads = await Lead.find({
        assignedAgent: agentId,
        isDeleted: { $ne: true },
      }).sort({ createdAt: -1 });

      return sendSuccess(res, 'Assigned leads fetched successfully', leads);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned leads', 500);
    }
  }

  /**
   * GET /api/agent/inquiries
   * Fetch ONLY inquiries assigned to logged-in agent
   */
  static async getAssignedInquiries(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentId = req.user?._id;
      if (!agentId) {
        return sendError(res, 'Not authorized', 401);
      }

      const inquiries = await Inquiry.find({
        $or: [
          { assignedAgent: agentId },
          { assignedAgent: req.user?.name },
        ],
      }).sort({ createdAt: -1 });

      return sendSuccess(res, 'Assigned inquiries fetched successfully', inquiries);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned inquiries', 500);
    }
  }
}
