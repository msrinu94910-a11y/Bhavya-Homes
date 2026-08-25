export const validateProject = (body: any) => {
  const errors: string[] = [];
  if (!body.name || typeof body.name !== 'string') errors.push('Project name is required');
  if (!body.description) errors.push('Description is required');
  if (!body.location) errors.push('Location is required');
  if (!body.city) errors.push('City is required');
  if (!body.state) errors.push('State is required');
  if (!body.projectType) errors.push('Project type is required');
  if (!body.status) errors.push('Project status is required');
  return { valid: errors.length === 0, errors };
};
