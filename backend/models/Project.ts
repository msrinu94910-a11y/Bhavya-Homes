import mongoose, { Schema, Document } from 'mongoose';

export enum ProjectType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  VILLAS = 'VILLAS',
  APARTMENTS = 'APARTMENTS',
  OPEN_PLOTS = 'OPEN_PLOTS',
  GATED_COMMUNITY = 'GATED_COMMUNITY',
}

export enum ProjectStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  SOLD_OUT = 'SOLD_OUT',
}

export interface IProject extends Document {
  name: string;
  slug: string;
  description: string;
  location: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  price?: number;
  projectType: ProjectType;
  status: ProjectStatus;
  amenities: string[];
  specifications: string[];
  images: string[];
  videos: string[];
  gallery: string[];
  mapLocation?: {
    latitude?: number;
    longitude?: number;
  };
  featured: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    address: { type: String, default: '' },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, default: '' },
    price: { type: Number, min: 0 },
    projectType: { type: String, enum: Object.values(ProjectType), required: true },
    status: { type: String, enum: Object.values(ProjectStatus), required: true },
    amenities: [{ type: String }],
    specifications: [{ type: String }],
    images: [{ type: String }],
    videos: [{ type: String }],
    gallery: [{ type: String }],
    mapLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ city: 1 });
ProjectSchema.index({ projectType: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ createdAt: -1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
