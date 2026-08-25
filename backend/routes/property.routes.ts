import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/', PropertyController.getAll);
router.get('/:slug', PropertyController.getBySlug);

// Admin-only endpoints
router.post('/', authenticate, authorize(UserRole.ADMIN), PropertyController.create);
router.put('/:id', authenticate, authorize(UserRole.ADMIN), PropertyController.update);
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), PropertyController.delete);

export default router;
