import { Router } from 'express';
import { LeadController } from '../controllers/lead.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.use(authenticate, authorize(UserRole.ADMIN));

router.get('/', LeadController.getAll);
router.post('/', LeadController.create);
router.put('/:id', LeadController.update);

export default router;
