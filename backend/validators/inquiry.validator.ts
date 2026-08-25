export const validateInquiry = (body: any) => {
  const errors: string[] = [];
  if (!body.name) errors.push('Name is required');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required');
  if (!body.phone) errors.push('Phone number is required');
  if (!body.message) errors.push('Message is required');
  return { valid: errors.length === 0, errors };
};
