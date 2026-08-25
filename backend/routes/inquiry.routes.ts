import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.post('/', InquiryController.create);
router.get('/', authenticate, authorize(UserRole.ADMIN), InquiryController.getAll);
router.put('/:id', authenticate, authorize(UserRole.ADMIN), InquiryController.updateStatus);

export default router;
