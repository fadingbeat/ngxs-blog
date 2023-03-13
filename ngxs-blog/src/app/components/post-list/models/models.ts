export interface PageModel<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}

export interface TableInfo {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
