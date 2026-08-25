import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/saved-properties', CustomerController.getSavedProperties);
router.post('/saved-properties', CustomerController.saveProperty);
router.delete('/saved-properties/:propertyId', CustomerController.removeSavedProperty);
router.put('/profile', CustomerController.updateProfile);

export default router;
