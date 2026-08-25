import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class PropertyController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await PropertyService.getAllProperties(req.query);
      return sendSuccess(res, 'Properties fetched successfully', result.properties, 200, result.pagination);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch properties', 500);
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const property = await PropertyService.getPropertyBySlug(req.params.slug);
      return sendSuccess(res, 'Property fetched successfully', property);
    } catch (error: any) {
      return sendError(res, error.message || 'Property not found', 404);
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const property = await PropertyService.createProperty(req.body, req.user!._id.toString());
      return sendSuccess(res, 'Property created successfully', property, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create property', 400);
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const property = await PropertyService.updateProperty(req.params.id, req.body);
      return sendSuccess(res, 'Property updated successfully', property);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update property', 400);
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      await PropertyService.deleteProperty(req.params.id);
      return sendSuccess(res, 'Property deleted successfully', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete property', 400);
    }
  }
}
