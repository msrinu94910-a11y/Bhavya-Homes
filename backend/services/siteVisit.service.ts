import { SiteVisit, ISiteVisit } from '../models/SiteVisit.js';
import { User } from '../models/User.js';
import { getPagination } from '../utils/pagination.js';
import mongoose from 'mongoose';

export class SiteVisitService {
  static async getAllSiteVisits(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    const targetEmail = query.email || query.customerEmail;
    if (targetEmail) {
      const user = await User.findOne({ email: targetEmail });
      if (user) {
        filter.customer = user._id;
      }
    } else if (query.customer) {
      if (mongoose.Types.ObjectId.isValid(query.customer)) {
        filter.customer = query.customer;
      } else {
        const user = await User.findOne({ email: query.customer });
        if (user) filter.customer = user._id;
      }
    }

    if (query.status) filter.status = query.status;

    const [siteVisits, total] = await Promise.all([
      SiteVisit.find(filter).populate('customer property').sort({ requestedDate: 1 }).skip(skip).limit(limit),
      SiteVisit.countDocuments(filter),
    ]);

    return { siteVisits, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async createSiteVisit(data: Partial<ISiteVisit>) {
    return SiteVisit.create(data);
  }

  static async updateSiteVisitStatus(id: string, updateData: Partial<ISiteVisit>) {
    const siteVisit = await SiteVisit.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, { new: true });
    if (!siteVisit) throw new Error('Site visit request not found');
    return siteVisit;
  }
}
