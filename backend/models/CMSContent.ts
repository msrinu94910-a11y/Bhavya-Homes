import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSContent extends Document {
  key: string;
  title?: string;
  content?: string;
  image?: string;
  metadata?: Record<string, any>;
  isPublished: boolean;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CMSContentSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true, uppercase: true, trim: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const CMSContent = mongoose.model<ICMSContent>('CMSContent', CMSContentSchema);
