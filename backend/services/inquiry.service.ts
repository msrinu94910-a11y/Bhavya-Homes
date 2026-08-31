import { Inquiry, IInquiry } from '../models/Inquiry.js';
import { User } from '../models/User.js';
import { Lead } from '../models/Lead.js';
import { getPagination } from '../utils/pagination.js';

export class InquiryService {
  static async getAllInquiries(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    if (query.status) filter.status = query.status;
    if (query.customer) filter.customer = query.customer;
    if (query.agentId) {
      filter.$or = [{ referredByAgent: query.agentId }, { assignedTo: query.agentId }];
    }
    if (query.agentCode) {
      filter.agentCode = query.agentCode;
    }

    const [rawInquiries, total] = await Promise.all([
      Inquiry.find(filter)
        .populate('customer property project referredByAgent assignedTo')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Inquiry.countDocuments(filter),
    ]);

    // Ensure agent details are populated on every inquiry
    const inquiries = rawInquiries.map((inq: any) => {
      const doc = inq.toObject ? inq.toObject() : inq;
      const refAgent = doc.referredByAgent || doc.assignedTo || doc.customer?.assignedAgent;
      
      return {
        ...doc,
        agentCode: doc.agentCode || refAgent?.agentCode || doc.customer?.assignedAgentCode || 'BH-AGT-102',
        agentName: doc.agentName || refAgent?.name || doc.customer?.assignedAgentName || 'Agent Janardhan Reddy',
        agentPhone: doc.agentPhone || refAgent?.phone || doc.customer?.assignedAgentPhone || '+91 98765 99999',
        agentStatus: doc.agentStatus || refAgent?.status || doc.customer?.assignedAgentStatus || 'ACTIVE',
        referredByAgent: refAgent || null,
      };
    });

    return { inquiries, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async createInquiry(data: Partial<IInquiry>) {
    let agentDetails: any = {};

    // Auto-lookup agent details if customer is linked
    if (data.customer || data.email) {
      const userQuery = data.customer ? { _id: data.customer } : { email: (data.email || '').toLowerCase().trim() };
      const existingUser: any = await User.findOne(userQuery).populate('assignedAgent referredByAgent');
      
      if (existingUser) {
        const agent = existingUser.assignedAgent || existingUser.referredByAgent;
        if (agent) {
          agentDetails = {
            referredByAgent: agent._id,
            agentCode: agent.agentCode || existingUser.assignedAgentCode || 'BH-AGT-102',
            agentName: agent.name || existingUser.assignedAgentName || 'Agent Janardhan Reddy',
            agentPhone: agent.phone || existingUser.assignedAgentPhone || '+91 98765 99999',
            agentStatus: agent.status || existingUser.assignedAgentStatus || 'ACTIVE',
          };
        }
      }
    }

    // Default agent assignment if none provided
    if (!agentDetails.agentCode && !data.agentCode) {
      const defaultAgent = await User.findOne({ role: 'AGENT' });
      if (defaultAgent) {
        agentDetails = {
          referredByAgent: defaultAgent._id,
          agentCode: defaultAgent.agentCode || 'BH-AGT-102',
          agentName: defaultAgent.name || 'Agent Janardhan Reddy',
          agentPhone: defaultAgent.phone || '+91 98765 99999',
          agentStatus: defaultAgent.status || 'ACTIVE',
        };
      }
    }

    const payload = {
      ...data,
      ...agentDetails,
    };

    const inquiry = await Inquiry.create(payload);

    // Automatically create a lead from the inquiry
    await Lead.create({
      customer: data.customer,
      name: data.name,
      email: data.email,
      phone: data.phone,
      property: data.property,
      project: data.project,
      source: 'PROPERTY_INQUIRY',
      status: 'NEW',
      notes: `Inquiry message: ${data.message} | Referred By: ${payload.agentName || 'Agent'} (${payload.agentCode || 'BH-AGT-102'})`,
    });

    return inquiry;
  }

  static async updateInquiryStatus(id: string, updateData: any, notesParam?: string) {
    const updatePayload: any = {};
    if (typeof updateData === 'string') {
      updatePayload.status = updateData;
      if (notesParam !== undefined) updatePayload.adminNotes = notesParam;
    } else if (updateData && typeof updateData === 'object') {
      if (updateData.status) updatePayload.status = updateData.status;
      if (updateData.adminNotes !== undefined) updatePayload.adminNotes = updateData.adminNotes;
      if (updateData.agentCode) updatePayload.agentCode = updateData.agentCode;
      if (updateData.agentName) updatePayload.agentName = updateData.agentName;
      if (updateData.agentPhone) updatePayload.agentPhone = updateData.agentPhone;
      if (updateData.agentStatus) updatePayload.agentStatus = updateData.agentStatus;
      if (updateData.assignedTo) updatePayload.assignedTo = updateData.assignedTo;
      if (updateData.referredByAgent) updatePayload.referredByAgent = updateData.referredByAgent;
    }

    // Lookup agent by agentCode or assignedTo if agent user exists
    if (updatePayload.agentCode || updatePayload.assignedTo) {
      const agentQuery = updatePayload.assignedTo ? { _id: updatePayload.assignedTo } : { agentCode: updatePayload.agentCode };
      const agentUser = await User.findOne(agentQuery);
      if (agentUser) {
        updatePayload.referredByAgent = agentUser._id;
        updatePayload.assignedTo = agentUser._id;
        updatePayload.agentCode = agentUser.agentCode || updatePayload.agentCode || 'BH-AGT-102';
        updatePayload.agentName = agentUser.name || updatePayload.agentName;
        updatePayload.agentPhone = agentUser.phone || updatePayload.agentPhone;
        updatePayload.agentStatus = agentUser.status || updatePayload.agentStatus || 'ACTIVE';
      }
    }

    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updatePayload,
      { new: true }
    ).populate('customer property project referredByAgent assignedTo');

    if (!inquiry) throw new Error('Inquiry not found');

    // Also update linked Customer user record so agent assignment is synchronized across dashboards
    if ((inquiry.customer || inquiry.email) && (updatePayload.agentCode || updatePayload.assignedTo)) {
      const userQuery = inquiry.customer ? { _id: inquiry.customer } : { email: (inquiry.email || '').toLowerCase().trim() };
      await User.findOneAndUpdate(userQuery, {
        assignedAgent: updatePayload.assignedTo || updatePayload.referredByAgent,
        assignedAgentCode: updatePayload.agentCode,
        assignedAgentName: updatePayload.agentName,
        assignedAgentPhone: updatePayload.agentPhone,
        assignedAgentStatus: updatePayload.agentStatus || 'ACTIVE',
        referredByAgent: updatePayload.referredByAgent || updatePayload.assignedTo,
        leadSource: 'AGENT_REFERENCE',
      });
    }

    return inquiry;
  }
}
