import { Property, IProperty, PropertyType, PropertyStatus, AreaUnit } from '../models/Property.js';
import { getPagination } from '../utils/pagination.js';

export class PropertyService {
  static async getAllProperties(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false };

    if (query.includeUnpublished !== 'true') {
      filter.isPublished = true;
    }

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

  static async createProperty(data: any, userId: string) {
    const title = data.title || data.name || 'Bhavya Homes Venture Property';
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = data.slug || `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // Safe normalization of propertyType to valid Mongoose Enum
    let normalizedType = PropertyType.VILLA;
    const rawType = (data.propertyType || data.type || '').toString().toUpperCase().trim();
    if (rawType.includes('PLOT')) normalizedType = PropertyType.OPEN_PLOT;
    else if (rawType.includes('APARTMENT') || rawType.includes('FLAT')) normalizedType = PropertyType.APARTMENT;
    else if (rawType.includes('COMMERCIAL')) normalizedType = PropertyType.COMMERCIAL;
    else if (rawType.includes('VILLA')) normalizedType = PropertyType.VILLA;

    // Parse clean number for area (handling strings like '3800sqft,200yds')
    const rawAreaStr = String(data.area || '');
    const parsedArea = parseInt(rawAreaStr.replace(/[^0-9]/g, ''), 10) || 2000;

    const property = await Property.create({
      title,
      slug,
      description: data.description || `${title} located in ${data.location || 'Hyderabad'}. Prime real estate venture developed by Bhavya Homes.`,
      propertyType: normalizedType,
      price: Number(data.price) || 5000000,
      location: data.location || 'Hyderabad',
      address: data.address || data.location || 'Bhavya Homes Venture',
      city: data.city || 'Hyderabad',
      state: data.state || 'Telangana',
      area: parsedArea,
      areaUnit: data.areaUnit || (normalizedType === PropertyType.OPEN_PLOT ? AreaUnit.SQ_YD : AreaUnit.SQ_FT),
      bedrooms: Number(data.bedrooms) || 0,
      bathrooms: Number(data.bathrooms) || 0,
      amenities: data.amenities || ['24/7 Security', 'Blacktop Roads', 'Underground Drainage'],
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image || '/villa1.jpg'],
      videos: data.videos || [],
      status: data.status || PropertyStatus.AVAILABLE,
      featured: Boolean(data.featured ?? data.isFeatured ?? false),
      isPublished: Boolean(data.isPublished ?? true),
      createdBy: userId,
    });
    return property;
  }

  static async updateProperty(id: string, data: any) {
    const updatePayload: any = { ...data };
    if (data.name) updatePayload.title = data.name;

    if (data.propertyType || data.type) {
      const rawType = (data.propertyType || data.type || '').toString().toUpperCase().trim();
      if (rawType.includes('PLOT')) updatePayload.propertyType = PropertyType.OPEN_PLOT;
      else if (rawType.includes('APARTMENT')) updatePayload.propertyType = PropertyType.APARTMENT;
      else updatePayload.propertyType = PropertyType.VILLA;
    }

    if (data.isFeatured !== undefined) updatePayload.featured = data.isFeatured;

    const property = await Property.findOneAndUpdate({ _id: id, isDeleted: false }, updatePayload, { new: true });
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
