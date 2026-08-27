import { Router } from 'express';
import { AdminCustomerController } from '../controllers/adminCustomer.controller.js';

const router = Router();

// Admin Customer Management CRUD Endpoints
router.get('/customers', AdminCustomerController.getCustomers);
router.get('/customers/:id', AdminCustomerController.getCustomerById);
router.post('/customers', AdminCustomerController.createCustomer);
router.put('/customers/:id', AdminCustomerController.updateCustomer);
router.delete('/customers/:id', AdminCustomerController.deleteCustomer);

export default router;
