export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  errorMessage?: string;
}

export interface ApiPagination {
  total: number;
  totalPages: number;
  hasMorePages: boolean;
  currentPage: number;
  limit: number;
}

export interface ApiPaginationResponse<T> extends ApiResponse<T>, ApiPagination { }
