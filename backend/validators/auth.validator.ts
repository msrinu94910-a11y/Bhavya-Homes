export const validateRegister = (body: any) => {
  const errors: string[] = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('Name is required');
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Valid email is required');
  }
  if (!body.phone || body.phone.trim() === '') {
    errors.push('Phone number is required');
  }
  if (!body.password || body.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  return { valid: errors.length === 0, errors };
};

export const validateLogin = (body: any) => {
  const errors: string[] = [];
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Valid email is required');
  }
  if (!body.password) {
    errors.push('Password is required');
  }
  return { valid: errors.length === 0, errors };
};
