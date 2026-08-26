import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller.js';

const router = Router();

router.get('/', PropertyController.getAll);
router.get('/:slug', PropertyController.getBySlug);

// Property CRUD endpoints (connected directly to MongoDB)
router.post('/', PropertyController.create);
router.put('/:id', PropertyController.update);
router.delete('/:id', PropertyController.delete);

export default router;
