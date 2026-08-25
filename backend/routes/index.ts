import { Router } from 'express';
import authRoutes from './auth.routes.js';
import propertyRoutes from './property.routes.js';
import projectRoutes from './project.routes.js';
import customerRoutes from './customer.routes.js';
import leadRoutes from './lead.routes.js';
import inquiryRoutes from './inquiry.routes.js';
import siteVisitRoutes from './siteVisit.routes.js';
import notificationRoutes from './notification.routes.js';
import cmsRoutes from './cms.routes.js';
import analyticsRoutes from './analytics.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/projects', projectRoutes);
router.use('/customer', customerRoutes);
router.use('/leads', leadRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/site-visits', siteVisitRoutes);
router.use('/notifications', notificationRoutes);
router.use('/cms', cmsRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
