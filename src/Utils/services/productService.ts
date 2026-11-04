import axiosInstance from "@/Utils/api/axiosInstance";
import type { Product, CreateProductPayload } from "@/types/product";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await axiosInstance.get<Product[]>("/products");
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await axiosInstance.get<Product>(`/products/${id}`);
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await axiosInstance.get<string[]>("/products/categories");
    return data;
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await axiosInstance.post<Product>("/products", payload);
    return data;
  },
};
