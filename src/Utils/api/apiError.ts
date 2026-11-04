import axios from "axios";
import type { ApiError, ApiErrorResponse } from "./apiTypes";

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected API error occurred";

    return {
      message,
      status: error.response?.status ?? null,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: null,
    };
  }

  return {
    message: "An unexpected error occurred",
    status: null,
  };
};
