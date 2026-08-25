import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/stats', authenticate, authorize(UserRole.ADMIN), AnalyticsController.getStats);

export default router;
