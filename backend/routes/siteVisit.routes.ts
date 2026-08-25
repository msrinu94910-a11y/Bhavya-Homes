import { Router } from 'express';
import { SiteVisitController } from '../controllers/siteVisit.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', SiteVisitController.getAll);
router.post('/', SiteVisitController.create);
router.put('/:id', SiteVisitController.updateStatus);

export default router;
