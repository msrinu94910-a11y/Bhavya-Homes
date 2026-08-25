import { Lead, ILead } from '../models/Lead.js';
import { getPagination } from '../utils/pagination.js';

export class LeadService {
  static async getAllLeads(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    if (query.status) filter.status = query.status;
    if (query.source) filter.source = query.source;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;

    const [leads, total] = await Promise.all([
      Lead.find(filter).populate('customer property project assignedTo').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(filter),
    ]);

    return { leads, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async createLead(data: Partial<ILead>) {
    return Lead.create(data);
  }

  static async updateLead(id: string, data: Partial<ILead>) {
    const lead = await Lead.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
    if (!lead) throw new Error('Lead not found');
    return lead;
  }
}
