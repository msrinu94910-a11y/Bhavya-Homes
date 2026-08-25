export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (pageQuery?: string | number, limitQuery?: string | number): PaginationOptions => {
  const page = Math.max(1, parseInt(String(pageQuery || 1), 10));
  const limit = Math.max(1, Math.min(100, parseInt(String(limitQuery || 10), 10)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
