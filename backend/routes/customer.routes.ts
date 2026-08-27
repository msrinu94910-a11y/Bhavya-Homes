import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller.js';

const router = Router();

// Customer Cart & Shortlist REST Endpoints connected to MongoDB
router.get('/saved-properties', CustomerController.getSavedProperties);
router.post('/saved-properties', CustomerController.saveProperty);
router.delete('/saved-properties/:propertyId', CustomerController.removeSavedProperty);
router.put('/profile', CustomerController.updateProfile);

export default router;
