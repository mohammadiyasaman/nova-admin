import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authThunks";
import { authStorage } from "@/Storage/authStorage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialToken = authStorage.getToken();

const initialState: AuthState = {
  token: initialToken,
  isAuthenticated: Boolean(initialToken),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
