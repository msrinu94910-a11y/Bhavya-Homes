import { Property } from '../models/Property.js';
import { Project } from '../models/Project.js';
import { User, UserRole } from '../models/User.js';
import { Lead } from '../models/Lead.js';
import { Inquiry } from '../models/Inquiry.js';
import { SiteVisit } from '../models/SiteVisit.js';

export class AnalyticsService {
  static async getDashboardStats() {
    const [
      totalProperties,
      availableProperties,
      soldProperties,
      totalProjects,
      totalCustomers,
      totalLeads,
      newInquiries,
      totalSiteVisits,
    ] = await Promise.all([
      Property.countDocuments({ isDeleted: false }),
      Property.countDocuments({ isDeleted: false, status: 'AVAILABLE' }),
      Property.countDocuments({ isDeleted: false, status: 'SOLD' }),
      Project.countDocuments({ isDeleted: false }),
      User.countDocuments({ isDeleted: false, role: UserRole.CUSTOMER }),
      Lead.countDocuments({ isDeleted: false }),
      Inquiry.countDocuments({ isDeleted: false, status: 'NEW' }),
      SiteVisit.countDocuments({ isDeleted: false }),
    ]);

    return {
      totalProperties,
      availableProperties,
      soldProperties,
      totalProjects,
      totalCustomers,
      totalLeads,
      newInquiries,
      totalSiteVisits,
    };
  }
}
