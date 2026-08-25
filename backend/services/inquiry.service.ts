import { Inquiry, IInquiry } from '../models/Inquiry.js';
import { Lead } from '../models/Lead.js';
import { getPagination } from '../utils/pagination.js';

export class InquiryService {
  static async getAllInquiries(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    if (query.status) filter.status = query.status;
    if (query.customer) filter.customer = query.customer;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter).populate('customer property project').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Inquiry.countDocuments(filter),
    ]);

    return { inquiries, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async createInquiry(data: Partial<IInquiry>) {
    const inquiry = await Inquiry.create(data);

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
      notes: `Inquiry message: ${data.message}`,
    });

    return inquiry;
  }

  static async updateInquiryStatus(id: string, status: string, adminNotes?: string) {
    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { status, adminNotes },
      { new: true }
    );
    if (!inquiry) throw new Error('Inquiry not found');
    return inquiry;
  }
}
