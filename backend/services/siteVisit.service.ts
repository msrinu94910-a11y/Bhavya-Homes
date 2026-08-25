import { SiteVisit, ISiteVisit } from '../models/SiteVisit.js';
import { getPagination } from '../utils/pagination.js';

export class SiteVisitService {
  static async getAllSiteVisits(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    if (query.customer) filter.customer = query.customer;
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
