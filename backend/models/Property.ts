import mongoose, { Schema, Document } from 'mongoose';

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  OPEN_PLOT = 'OPEN_PLOT',
  COMMERCIAL = 'COMMERCIAL',
  INDEPENDENT_HOUSE = 'INDEPENDENT_HOUSE',
  FARM_LAND = 'FARM_LAND',
  GATED_COMMUNITY = 'GATED_COMMUNITY',
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  UPCOMING = 'UPCOMING',
}

export enum AreaUnit {
  SQ_FT = 'SQ_FT',
  SQ_YD = 'SQ_YD',
  ACRE = 'ACRE',
  HECTARE = 'HECTARE',
}

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  price: number;
  location: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  area: number;
  areaUnit: AreaUnit;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  images: string[];
  videos: string[];
  project?: mongoose.Types.ObjectId;
  status: PropertyStatus;
  featured: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    propertyType: { type: String, enum: Object.values(PropertyType), required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, default: '' },
    area: { type: Number, required: true, min: 0 },
    areaUnit: { type: String, enum: Object.values(AreaUnit), default: AreaUnit.SQ_FT, required: true },
    bedrooms: { type: Number, min: 0, default: 0 },
    bathrooms: { type: Number, min: 0, default: 0 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    videos: [{ type: String }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    status: { type: String, enum: Object.values(PropertyStatus), default: PropertyStatus.AVAILABLE, required: true },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

PropertySchema.index({ city: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ featured: 1 });
PropertySchema.index({ project: 1 });
PropertySchema.index({ createdAt: -1 });

export const Property = mongoose.model<IProperty>('Property', PropertySchema);
