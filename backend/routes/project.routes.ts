import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:slug', ProjectController.getBySlug);

// Admin-only endpoints
router.post('/', authenticate, authorize(UserRole.ADMIN), ProjectController.create);
router.put('/:id', authenticate, authorize(UserRole.ADMIN), ProjectController.update);
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), ProjectController.delete);

export default router;
