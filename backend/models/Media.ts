import mongoose, { Schema, Document } from 'mongoose';

export enum ResourceType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface IMedia extends Document {
  url: string;
  publicId: string;
  resourceType: ResourceType;
  format?: string;
  width?: number;
  height?: number;
  size?: number;
  folder?: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true, trim: true },
    resourceType: { type: String, enum: Object.values(ResourceType), default: ResourceType.IMAGE, required: true },
    format: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    size: { type: Number },
    folder: { type: String, default: 'bhavya_homes' },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

MediaSchema.index({ publicId: 1 });
MediaSchema.index({ uploadedBy: 1 });

export const Media = mongoose.model<IMedia>('Media', MediaSchema);
