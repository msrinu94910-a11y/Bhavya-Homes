import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', NotificationController.getUserNotifications);
router.put('/:id/read', NotificationController.markAsRead);

export default router;
