import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "@/Utils/services/productService";
import { handleApiError } from "@/Utils/api/apiError";
import type { Product, CreateProductPayload } from "@/types/product";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    return await productService.getAll();
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    return await productService.getById(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});

export const createProduct = createAsyncThunk<
  Product,
  CreateProductPayload,
  { rejectValue: string }
>("products/createProduct", async (payload, { rejectWithValue }) => {
  try {
    return await productService.create(payload);
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});
