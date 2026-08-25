import mongoose, { Schema, Document } from 'mongoose';

export enum SiteVisitStatus {
  REQUESTED = 'REQUESTED',
  CONFIRMED = 'CONFIRMED',
  RESCHEDULED = 'RESCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface ISiteVisit extends Document {
  customer: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  requestedDate: Date;
  requestedTime: string;
  confirmedDate?: Date;
  confirmedTime?: string;
  status: SiteVisitStatus;
  adminNotes?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SiteVisitSchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    requestedDate: { type: Date, required: true },
    requestedTime: { type: String, required: true, trim: true },
    confirmedDate: { type: Date },
    confirmedTime: { type: String, trim: true },
    status: { type: String, enum: Object.values(SiteVisitStatus), default: SiteVisitStatus.REQUESTED, required: true },
    adminNotes: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

SiteVisitSchema.index({ customer: 1 });
SiteVisitSchema.index({ property: 1 });
SiteVisitSchema.index({ status: 1 });
SiteVisitSchema.index({ requestedDate: 1 });

export const SiteVisit = mongoose.model<ISiteVisit>('SiteVisit', SiteVisitSchema);
