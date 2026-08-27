import { Router } from 'express';
import { AdminAgentController } from '../controllers/adminAgent.controller.js';

const router = Router();

// Admin Agent CRUD Endpoints
router.get('/agents', AdminAgentController.getAgents);
router.get('/agents/:id', AdminAgentController.getAgentById);
router.post('/agents', AdminAgentController.createAgent);
router.put('/agents/:id', AdminAgentController.updateAgent);
router.delete('/agents/:id', AdminAgentController.deleteAgent);

// Customer Assignment Endpoints
router.post('/assign-customer', AdminAgentController.assignCustomer);
router.put('/reassign-customer', AdminAgentController.reassignCustomer);

export default router;
