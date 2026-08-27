import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  user?: mongoose.Types.ObjectId;
  userName?: string;
  userRole?: string;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, default: 'System' },
    userRole: { type: String, default: 'SYSTEM' },
    action: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ action: 1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
