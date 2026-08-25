import { Project, IProject } from '../models/Project.js';
import { getPagination } from '../utils/pagination.js';

export class ProjectService {
  static async getAllProjects(query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: any = { isDeleted: false, isPublished: true };

    if (query.city) filter.city = new RegExp(query.city, 'i');
    if (query.projectType) filter.projectType = query.projectType;
    if (query.status) filter.status = query.status;
    if (query.featured) filter.featured = query.featured === 'true';

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);

    return {
      projects,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  static async getProjectBySlug(slug: string) {
    const project = await Project.findOne({ slug, isDeleted: false });
    if (!project) throw new Error('Project not found');
    return project;
  }

  static async createProject(data: Partial<IProject>, userId: string) {
    const slug = data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const project = await Project.create({ ...data, slug, createdBy: userId });
    return project;
  }

  static async updateProject(id: string, data: Partial<IProject>) {
    const project = await Project.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
    if (!project) throw new Error('Project not found');
    return project;
  }

  static async deleteProject(id: string) {
    const project = await Project.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!project) throw new Error('Project not found');
    return project;
  }
}
