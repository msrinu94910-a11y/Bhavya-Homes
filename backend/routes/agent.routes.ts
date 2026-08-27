import { Router } from 'express';
import { AgentDashboardController } from '../controllers/agentDashboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/dashboard', authenticate, AgentDashboardController.getDashboardSummary);
router.get('/customers', authenticate, AgentDashboardController.getAssignedCustomers);
router.get('/leads', authenticate, AgentDashboardController.getAssignedLeads);
router.get('/inquiries', authenticate, AgentDashboardController.getAssignedInquiries);

export default router;
