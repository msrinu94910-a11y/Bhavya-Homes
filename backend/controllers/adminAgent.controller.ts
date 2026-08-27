import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserRole, UserStatus } from '../models/User.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AdminAgentController {
  /**
   * GET /api/admin/agents
   * Fetch all real-time agents with search, status filter, and pagination
   */
  static async getAgents(req: Request, res: Response): Promise<Response> {
    try {
      const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string, 10) || 20));
      const skip = (page - 1) * limit;

      const search = (req.query.search as string || '').trim();
      const statusFilter = (req.query.status as string || '').trim().toUpperCase();

      const query: any = {
        role: UserRole.AGENT,
        isDeleted: { $ne: true },
      };

      if (statusFilter && statusFilter !== 'ALL') {
        query.status = statusFilter;
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
          { name: regex },
          { email: regex },
          { phone: regex },
          { agentCode: regex },
        ];
      }

      const [agents, total] = await Promise.all([
        User.find(query)
          .select('-password')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments(query),
      ]);

      const [totalAgents, activeAgents, inactiveAgents] = await Promise.all([
        User.countDocuments({ role: UserRole.AGENT, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.AGENT, status: UserStatus.ACTIVE, isDeleted: { $ne: true } }),
        User.countDocuments({ role: UserRole.AGENT, status: UserStatus.INACTIVE, isDeleted: { $ne: true } }),
      ]);

      return sendSuccess(res, 'Agents fetched successfully', {
        agents,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit) || 1,
          limit,
        },
        analytics: {
          totalAgents,
          activeAgents,
          inactiveAgents,
        },
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch agents', 500);
    }
  }

  /**
   * GET /api/admin/agents/:id
   * Fetch single agent details and assigned customer list
   */
  static async getAgentById(req: Request, res: Response): Promise<Response> {
    try {
      const agent = await User.findOne({
        _id: req.params.id,
        role: UserRole.AGENT,
        isDeleted: { $ne: true },
      }).select('-password');

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      const assignedCustomers = await User.find({
        assignedAgent: agent._id,
        isDeleted: { $ne: true },
      }).select('name email phone status createdAt');

      return sendSuccess(res, 'Agent details fetched successfully', {
        agent,
        assignedCustomers,
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch agent', 500);
    }
  }

  /**
   * POST /api/admin/agents
   * Create new agent account with auto-generated Agent Code
   */
  static async createAgent(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, password, status } = req.body;

      if (!name || !email || !phone) {
        return sendError(res, 'Name, email, and phone are required', 400);
      }

      const cleanEmail = email.toLowerCase().trim();
      const existing = await User.findOne({ email: cleanEmail, isDeleted: { $ne: true } });
      if (existing) {
        return sendError(res, 'An account with this email address already exists', 400);
      }

      const count = await User.countDocuments({ role: UserRole.AGENT });
      const agentCode = `BH-AGT-${101 + count}`;
      const userId = `AGT-${Date.now().toString().slice(-6)}`;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || 'Agent@123', salt);

      const agent = await User.create({
        userId,
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        password: hashedPassword,
        role: UserRole.AGENT,
        agentCode,
        status: status || UserStatus.ACTIVE,
        isActive: status !== UserStatus.INACTIVE,
        totalLeads: 0,
        totalCustomers: 0,
      });

      await ActivityLog.create({
        user: agent._id,
        userName: agent.name,
        userRole: 'ADMIN',
        action: 'AGENT_CREATED',
        description: `New agent created: ${agent.name} (Code: ${agent.agentCode})`,
        metadata: { agentCode: agent.agentCode, email: agent.email },
      });

      const sanitized = await User.findById(agent._id).select('-password');
      return sendSuccess(res, 'Agent created successfully', sanitized, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create agent', 400);
    }
  }

  /**
   * PUT /api/admin/agents/:id
   * Update agent details
   */
  static async updateAgent(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, status, isActive } = req.body;
      const agent = await User.findOne({ _id: req.params.id, role: UserRole.AGENT, isDeleted: { $ne: true } });

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      if (email && email.toLowerCase().trim() !== agent.email) {
        const cleanEmail = email.toLowerCase().trim();
        const existing = await User.findOne({ email: cleanEmail, _id: { $ne: agent._id }, isDeleted: { $ne: true } });
        if (existing) {
          return sendError(res, 'Email address is already in use', 400);
        }
        agent.email = cleanEmail;
      }

      if (name) agent.name = name.trim();
      if (phone) agent.phone = phone.trim();

      if (status) {
        const uppercaseStatus = status.toString().toUpperCase() as UserStatus;
        agent.status = uppercaseStatus;
        agent.isActive = uppercaseStatus === UserStatus.ACTIVE;
      } else if (isActive !== undefined) {
        agent.isActive = Boolean(isActive);
        agent.status = Boolean(isActive) ? UserStatus.ACTIVE : UserStatus.INACTIVE;
      }

      await agent.save();

      await ActivityLog.create({
        user: agent._id,
        userName: agent.name,
        userRole: 'ADMIN',
        action: 'AGENT_UPDATED',
        description: `Agent updated: ${agent.name} (${agent.agentCode})`,
      });

      const updated = await User.findById(agent._id).select('-password');
      return sendSuccess(res, 'Agent record updated successfully', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update agent', 400);
    }
  }

  /**
   * DELETE /api/admin/agents/:id
   * Soft delete agent record
   */
  static async deleteAgent(req: Request, res: Response): Promise<Response> {
    try {
      const agent = await User.findOne({ _id: req.params.id, role: UserRole.AGENT, isDeleted: { $ne: true } });
      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      agent.isDeleted = true;
      agent.deletedAt = new Date();
      await agent.save();

      await ActivityLog.create({
        user: agent._id,
        userName: agent.name,
        userRole: 'ADMIN',
        action: 'AGENT_DELETED',
        description: `Agent soft-deleted: ${agent.name} (${agent.agentCode})`,
      });

      return sendSuccess(res, 'Agent deleted successfully', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete agent', 500);
    }
  }

  /**
   * POST /api/admin/assign-customer
   * Assign customer to an agent
   */
  static async assignCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const { customerId, agentId } = req.body;

      if (!customerId || !agentId) {
        return sendError(res, 'Both customerId and agentId are required', 400);
      }

      const customer = await User.findOne({ _id: customerId, role: UserRole.CUSTOMER, isDeleted: { $ne: true } });
      if (!customer) {
        return sendError(res, 'Customer record not found', 404);
      }

      const agent = await User.findOne({ _id: agentId, role: UserRole.AGENT, isDeleted: { $ne: true } });
      if (!agent) {
        return sendError(res, 'Agent record not found', 404);
      }

      // Decrement previous agent total count if applicable
      if (customer.assignedAgent && customer.assignedAgent.toString() !== agent._id.toString()) {
        await User.findByIdAndUpdate(customer.assignedAgent, { $inc: { totalCustomers: -1 } });
      }

      customer.assignedAgent = agent._id;
      customer.assignedAgentCode = agent.agentCode || 'BH-AGT-101';
      customer.assignedAgentName = agent.name;
      await customer.save();

      agent.totalCustomers = (agent.totalCustomers || 0) + 1;
      await agent.save();

      await ActivityLog.create({
        user: customer._id,
        userName: customer.name,
        userRole: 'ADMIN',
        action: 'CUSTOMER_ASSIGNED',
        description: `Customer ${customer.name} assigned to Agent ${agent.name} (${agent.agentCode})`,
        metadata: { customerId: customer._id, agentId: agent._id },
      });

      const updatedCustomer = await User.findById(customer._id).select('-password');
      return sendSuccess(res, `Customer assigned to Agent ${agent.name} successfully`, updatedCustomer);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to assign customer', 400);
    }
  }

  /**
   * PUT /api/admin/reassign-customer
   * Reassign customer to new agent
   */
  static async reassignCustomer(req: Request, res: Response): Promise<Response> {
    return AdminAgentController.assignCustomer(req, res);
  }
}
