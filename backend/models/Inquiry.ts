import mongoose, { Schema, Document } from 'mongoose';

export enum InquirySource {
  PROPERTY = 'PROPERTY',
  PROJECT = 'PROJECT',
  CONTACT_FORM = 'CONTACT_FORM',
  WEBSITE = 'WEBSITE',
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
}

export enum InquiryStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface IInquiry extends Document {
  customer?: mongoose.Types.ObjectId;
  property?: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: InquirySource;
  status: InquiryStatus;
  assignedTo?: mongoose.Types.ObjectId;
  // Agent Reference Tracking Fields
  referredByAgent?: mongoose.Types.ObjectId;
  agentCode?: string;
  agentName?: string;
  agentPhone?: string;
  agentStatus?: string;
  adminNotes?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, enum: Object.values(InquirySource), default: InquirySource.WEBSITE, required: true },
    status: { type: String, enum: Object.values(InquiryStatus), default: InquiryStatus.NEW, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    // Agent Reference Tracking Fields
    referredByAgent: { type: Schema.Types.ObjectId, ref: 'User' },
    agentCode: { type: String, trim: true, default: '' },
    agentName: { type: String, trim: true, default: '' },
    agentPhone: { type: String, trim: true, default: '' },
    agentStatus: { type: String, trim: true, default: 'ACTIVE' },
    adminNotes: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

InquirySchema.index({ customer: 1 });
InquirySchema.index({ property: 1 });
InquirySchema.index({ project: 1 });
InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
