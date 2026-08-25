import { Request, Response } from 'express';
import { LeadService } from '../services/lead.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class LeadController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await LeadService.getAllLeads(req.query);
      return sendSuccess(res, 'Leads fetched successfully', result.leads, 200, result.pagination);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch leads', 500);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const lead = await LeadService.createLead(req.body);
      return sendSuccess(res, 'Lead created successfully', lead, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create lead', 400);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const lead = await LeadService.updateLead(req.params.id, req.body);
      return sendSuccess(res, 'Lead updated successfully', lead);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update lead', 400);
    }
  }
}
