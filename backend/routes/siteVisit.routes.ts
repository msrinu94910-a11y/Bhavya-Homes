import { Router } from 'express';
import { SiteVisitController } from '../controllers/siteVisit.controller.js';

const router = Router();

// Public & Customer Site Visit Endpoints connected to MongoDB
router.get('/', SiteVisitController.getAll);
router.post('/', SiteVisitController.create);
router.put('/:id', SiteVisitController.updateStatus);
router.delete('/:id', SiteVisitController.delete);

export default router;
