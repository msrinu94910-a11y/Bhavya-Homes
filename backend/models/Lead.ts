import mongoose, { Schema, Document } from 'mongoose';

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  PROPERTY_INQUIRY = 'PROPERTY_INQUIRY',
  PROJECT_INQUIRY = 'PROJECT_INQUIRY',
  CONTACT_FORM = 'CONTACT_FORM',
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
  SITE_VISIT = 'SITE_VISIT',
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  INTERESTED = 'INTERESTED',
  FOLLOW_UP = 'FOLLOW_UP',
  SITE_VISIT = 'SITE_VISIT',
  NEGOTIATION = 'NEGOTIATION',
  CONVERTED = 'CONVERTED',
  NOT_INTERESTED = 'NOT_INTERESTED',
  CLOSED = 'CLOSED',
}

export interface ILead extends Document {
  customer?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  property?: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  source: LeadSource;
  status: LeadStatus;
  assignedTo?: mongoose.Types.ObjectId;
  notes?: string;
  nextFollowUpAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    source: { type: String, enum: Object.values(LeadSource), default: LeadSource.WEBSITE, required: true },
    status: { type: String, enum: Object.values(LeadStatus), default: LeadStatus.NEW, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String, default: '' },
    nextFollowUpAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

LeadSchema.index({ status: 1 });
LeadSchema.index({ source: 1 });
LeadSchema.index({ assignedTo: 1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ phone: 1 });
LeadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
