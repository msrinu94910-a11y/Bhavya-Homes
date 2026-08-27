import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:slug', ProjectController.getBySlug);

// Project CRUD endpoints connected to MongoDB
router.post('/', ProjectController.create);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

export default router;
