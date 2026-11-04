import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/Utils/services/userService";
import { handleApiError } from "@/Utils/api/apiError";
import type { User, CreateUserPayload } from "@/types/user";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await userService.getAll();
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});

export const fetchUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("users/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    return await userService.getById(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});

export const createUser = createAsyncThunk<
  User,
  CreateUserPayload,
  { rejectValue: string }
>("users/createUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await userService.create(payload);

    return {
      ...payload,
      id: response.id,
    };
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});
