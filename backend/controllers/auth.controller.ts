import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = await AuthService.registerCustomer(req.body);
      return sendSuccess(res, 'User registered successfully', result, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Registration failed', 400);
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return sendSuccess(res, 'Login successful', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Authentication failed', 401);
    }
  }

  static async getMe(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const user = req.user ? AuthService.sanitizeUser(req.user) : null;
      return sendSuccess(res, 'Current user profile fetched', { user });
    } catch (error: any) {
      return sendError(res, 'Failed to fetch user profile', 500);
    }
  }
}
