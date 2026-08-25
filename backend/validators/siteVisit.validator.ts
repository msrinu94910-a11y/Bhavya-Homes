export const validateSiteVisit = (body: any) => {
  const errors: string[] = [];
  if (!body.property) errors.push('Property ID is required');
  if (!body.requestedDate) errors.push('Requested date is required');
  if (!body.requestedTime) errors.push('Requested time slot is required');
  return { valid: errors.length === 0, errors };
};
