import axiosInstance from "@/Utils/api/axiosInstance";
import type { User, CreateUserPayload, CreateUserResponse } from "@/types/user";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await axiosInstance.get<User[]>("/users");
    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await axiosInstance.get<User>(`/users/${id}`);
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
    const { data } = await axiosInstance.post<CreateUserResponse>(
      "/users",
      payload,
    );

    return data;
  },
};
