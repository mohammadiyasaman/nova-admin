import axiosInstance from "@/Utils/api/axiosInstance";
import type { LoginPayload, LoginResponse } from "@/types/auth";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      payload,
    );

    return data;
  },
};
