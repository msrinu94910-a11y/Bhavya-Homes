import { Router } from 'express';
import { CMSController } from '../controllers/cms.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/:key', CMSController.getByKey);
router.put('/:key', authenticate, authorize(UserRole.ADMIN), CMSController.updateKey);

export default router;
