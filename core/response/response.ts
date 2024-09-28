export interface ApiResponse<T> {
  data: {
    content: T
  } | null;
  error: BaseError | null;
}

export interface ApiPaginatedResponse<T> {
  data: {
    content: T[];
    currentPage: number;
    totalPage: number;
    pageSize: number;
    totalElements: number;
  } | null;
  error: BaseError | null
}
