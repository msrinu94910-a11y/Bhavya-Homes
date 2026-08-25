import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  customerImage?: string;
  rating: number;
  message: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerImage: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ isPublished: 1 });
TestimonialSchema.index({ rating: -1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
