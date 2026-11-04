export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number | null;
}
