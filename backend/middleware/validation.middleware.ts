import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

export const validateRequest = (validator: (body: any) => { valid: boolean; errors?: string[] }) => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const { valid, errors } = validator(req.body);
    if (!valid) {
      return sendError(res, 'Validation error', 400, errors);
    }
    next();
  };
};
