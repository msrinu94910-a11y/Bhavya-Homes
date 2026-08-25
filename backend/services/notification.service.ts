import { Notification, INotification } from '../models/Notification.js';

export class NotificationService {
  static async getUserNotifications(userId: string) {
    return Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(50);
  }

  static async markAsRead(id: string, userId: string) {
    return Notification.findOneAndUpdate({ _id: id, user: userId }, { isRead: true }, { new: true });
  }

  static async createNotification(data: Partial<INotification>) {
    return Notification.create(data);
  }
}
