import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.post('/', InquiryController.create);
router.get('/', InquiryController.getAll);
router.put('/:id', InquiryController.updateStatus);

export default router;
