import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedProperty extends Document {
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  createdAt: Date;
}

const SavedPropertySchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

SavedPropertySchema.index({ user: 1, property: 1 }, { unique: true });

export const SavedProperty = mongoose.model<ISavedProperty>('SavedProperty', SavedPropertySchema);
