import cloudinary from '../config/cloudinary.js';
import { Media, ResourceType } from '../models/Media.js';

export class MediaService {
  static async uploadMedia(filePath: string, userId: string, folder = 'bhavya_homes') {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    const media = await Media.create({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type === 'video' ? ResourceType.VIDEO : ResourceType.IMAGE,
      format: result.format,
      width: result.width,
      height: result.height,
      size: result.bytes,
      folder,
      uploadedBy: userId,
    });
    return media;
  }

  static async deleteMedia(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
    await Media.deleteOne({ publicId });
    return { success: true };
  }
}
