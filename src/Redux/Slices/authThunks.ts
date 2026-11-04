import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/Utils/services/authService";
import { handleApiError } from "@/Utils/api/apiError";
import { authStorage } from "@/Storage/authStorage";
import type { LoginPayload } from "@/types/auth";

export const loginUser = createAsyncThunk<
  string,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);

    authStorage.setToken(response.token);

    return response.token;
  } catch (error) {
    return rejectWithValue(handleApiError(error).message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authStorage.removeToken();
});
