export const validateProperty = (body: any) => {
  const errors: string[] = [];
  if (!body.title || typeof body.title !== 'string') errors.push('Title is required');
  if (!body.description) errors.push('Description is required');
  if (!body.propertyType) errors.push('Property type is required');
  if (typeof body.price !== 'number' || body.price < 0) errors.push('Valid price is required');
  if (!body.location) errors.push('Location is required');
  if (!body.city) errors.push('City is required');
  if (!body.state) errors.push('State is required');
  if (typeof body.area !== 'number' || body.area < 0) errors.push('Valid area is required');
  return { valid: errors.length === 0, errors };
};
