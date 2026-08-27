import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', validateRequest(validateRegister), AuthController.register);
router.post('/login', validateRequest(validateLogin), AuthController.login);
router.get('/me', authenticate, AuthController.getMe);

// Full User CRUD REST Endpoints connected to MongoDB
router.get('/users', AuthController.getUsers);
router.post('/users', AuthController.createUser);
router.put('/users/:id', AuthController.updateUser);
router.delete('/users/:id', AuthController.deleteUser);

export default router;
