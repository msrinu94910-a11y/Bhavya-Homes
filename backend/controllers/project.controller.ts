import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class ProjectController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ProjectService.getAllProjects(req.query);
      return sendSuccess(res, 'Projects fetched successfully', result.projects, 200, result.pagination);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch projects', 500);
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const project = await ProjectService.getProjectBySlug(req.params.slug);
      return sendSuccess(res, 'Project fetched successfully', project);
    } catch (error: any) {
      return sendError(res, error.message || 'Project not found', 404);
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      let userId = req.user?._id?.toString();
      if (!userId) {
        const adminUser = await User.findOne({ role: 'ADMIN' });
        userId = adminUser?._id?.toString() || '650000000000000000000001';
      }
      const project = await ProjectService.createProject(req.body, userId);
      return sendSuccess(res, 'Project created successfully', project, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create project', 400);
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const project = await ProjectService.updateProject(req.params.id, req.body);
      return sendSuccess(res, 'Project updated successfully', project);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update project', 400);
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      await ProjectService.deleteProject(req.params.id);
      return sendSuccess(res, 'Project deleted successfully', null);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete project', 400);
    }
  }
}
