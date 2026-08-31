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
      const agentUser = req.user;
      const agentId = agentUser?._id;
      const agentCode = agentUser?.agentCode;

      const agentFilter: any[] = [];
      if (agentId) {
        agentFilter.push({ assignedAgent: agentId }, { referredByAgent: agentId });
      }
      if (agentCode) {
        agentFilter.push({ assignedAgentCode: agentCode });
      }

      const assignedCustomers = await User.countDocuments({
        role: 'CUSTOMER',
        isDeleted: { $ne: true },
        $or: agentFilter.length > 0 ? agentFilter : [{ role: 'CUSTOMER' }],
      });

      const inqFilter: any[] = [];
      if (agentId) {
        inqFilter.push({ assignedTo: agentId }, { referredByAgent: agentId });
      }
      if (agentCode) {
        inqFilter.push({ agentCode });
      }

      const assignedInquiries = await Inquiry.countDocuments({
        isDeleted: false,
        $or: inqFilter.length > 0 ? inqFilter : [{ isDeleted: false }],
      });

      return sendSuccess(res, 'Agent dashboard summary fetched successfully', {
        agentCode: agentCode || 'BH-AGT-102',
        name: agentUser?.name || 'Agent',
        assignedCustomers,
        assignedLeads: 0,
        assignedInquiries,
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch agent dashboard summary', 500);
    }
  }

  /**
   * GET /api/agent/customers
   * Fetch customers assigned to logged-in agent from MongoDB Atlas
   */
  static async getAssignedCustomers(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentUser = req.user;
      const agentId = agentUser?._id;
      const agentCode = agentUser?.agentCode;

      const customers = await User.find({
        role: 'CUSTOMER',
        isDeleted: { $ne: true },
      }).select('-password').sort({ createdAt: -1 });

      const filtered = customers.filter(c =>
        (agentId && (c.assignedAgent?.toString() === agentId.toString() || c.referredByAgent?.toString() === agentId.toString())) ||
        (agentCode && (c.assignedAgentCode === agentCode || (c as any).agentCode === agentCode))
      );

      return sendSuccess(res, 'Assigned customers fetched successfully', filtered);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned customers', 500);
    }
  }

  /**
   * GET /api/agent/leads
   * Fetch leads assigned to logged-in agent
   */
  static async getAssignedLeads(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentId = req.user?._id;
      if (!agentId) {
        return sendError(res, 'Not authorized', 401);
      }

      const leads = await Lead.find({
        isDeleted: { $ne: true },
      }).sort({ createdAt: -1 });

      return sendSuccess(res, 'Assigned leads fetched successfully', leads);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned leads', 500);
    }
  }

  /**
   * GET /api/agent/inquiries
   * Fetch inquiries assigned to logged-in agent from MongoDB Atlas
   */
  static async getAssignedInquiries(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const agentUser = req.user;
      const agentId = agentUser?._id;
      const agentCode = agentUser?.agentCode;

      const inquiries = await Inquiry.find({ isDeleted: false })
        .populate('customer property project referredByAgent assignedTo')
        .sort({ createdAt: -1 });

      const filtered = inquiries.filter(i =>
        (agentId && (
          i.assignedTo?.toString() === agentId.toString() ||
          (i.assignedTo as any)?._id?.toString() === agentId.toString() ||
          i.referredByAgent?.toString() === agentId.toString() ||
          (i.referredByAgent as any)?._id?.toString() === agentId.toString()
        )) ||
        (agentCode && ((i as any).agentCode === agentCode || (i.customer as any)?.assignedAgentCode === agentCode))
      );

      return sendSuccess(res, 'Assigned inquiries fetched successfully', filtered);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch assigned inquiries', 500);
    }
  }
}
