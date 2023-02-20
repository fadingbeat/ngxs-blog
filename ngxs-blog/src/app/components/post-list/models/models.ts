export interface PageModel<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}

export interface TableInfo {
  page: number;
  size: number;
  id: number;
  title: string;
  description: string;
  content: string;
  datePosted: string;
}
