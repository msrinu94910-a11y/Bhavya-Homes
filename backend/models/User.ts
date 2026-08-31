import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export interface IUser extends Document {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  profileImage?: string;
  // Agent Fields
  agentCode?: string;
  totalLeads?: number;
  totalCustomers?: number;
  // Customer Assignment Fields
  assignedAgent?: mongoose.Types.ObjectId;
  assignedAgentCode?: string;
  assignedAgentName?: string;
  assignedAgentPhone?: string;
  assignedAgentStatus?: string;
  referredByAgent?: mongoose.Types.ObjectId;
  leadSource?: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER, required: true },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE, required: true },
    profileImage: { type: String, default: '' },
    // Agent Fields
    agentCode: { type: String, trim: true },
    totalLeads: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
    // Customer Assignment Fields
    assignedAgent: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedAgentCode: { type: String, trim: true, default: '' },
    assignedAgentName: { type: String, trim: true, default: '' },
    assignedAgentPhone: { type: String, trim: true, default: '' },
    assignedAgentStatus: { type: String, trim: true, default: 'ACTIVE' },
    referredByAgent: { type: Schema.Types.ObjectId, ref: 'User' },
    leadSource: { type: String, default: 'AGENT_REFERENCE' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ role: 1, isDeleted: 1 });
UserSchema.index({ agentCode: 1 });
UserSchema.index({ userId: 1 });
UserSchema.index({ assignedAgent: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ name: 'text', email: 'text', phone: 'text' });

export const User = mongoose.model<IUser>('User', UserSchema);
