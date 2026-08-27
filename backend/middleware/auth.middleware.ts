import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { User, IUser, UserRole } from '../models/User.js';
import { sendError } from '../utils/response.js';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 'Not authorized, token missing', 401);
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || user.isDeleted || !user.isActive) {
      return sendError(res, 'User no longer exists or is inactive', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  if (req.user && req.user.role === UserRole.ADMIN) {
    return next();
  }
  return sendError(res, 'Access denied. Administrator privilege required.', 403);
};
