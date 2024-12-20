export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};