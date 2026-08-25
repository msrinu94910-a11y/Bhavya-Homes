import { Property, IProperty } from '../models/Property.js';
import { getPagination } from '../utils/pagination.js';

export class PropertyService {
  static async getAllProperties(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false, isPublished: true };

    if (query.city) filter.city = new RegExp(query.city, 'i');
    if (query.propertyType) filter.propertyType = query.propertyType;
    if (query.status) filter.status = query.status;
    if (query.featured) filter.featured = query.featured === 'true';
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }
    if (query.bedrooms) filter.bedrooms = Number(query.bedrooms);

    const sort: any = {};
    if (query.sortBy === 'price_asc') sort.price = 1;
    else if (query.sortBy === 'price_desc') sort.price = -1;
    else sort.createdAt = -1;

    const [properties, total] = await Promise.all([
      Property.find(filter).populate('project', 'name slug').sort(sort).skip(skip).limit(limit),
      Property.countDocuments(filter),
    ]);

    return {
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getPropertyBySlug(slug: string) {
    const property = await Property.findOne({ slug, isDeleted: false }).populate('project');
    if (!property) throw new Error('Property not found');
    return property;
  }

  static async createProperty(data: Partial<IProperty>, userId: string) {
    const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const property = await Property.create({ ...data, slug, createdBy: userId });
    return property;
  }

  static async updateProperty(id: string, data: Partial<IProperty>) {
    const property = await Property.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
    if (!property) throw new Error('Property not found');
    return property;
  }

  static async deleteProperty(id: string) {
    const property = await Property.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!property) throw new Error('Property not found');
    return property;
  }
}
