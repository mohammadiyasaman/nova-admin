import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import { fetchUsers, fetchUserById, createUser } from "./userThunks";

interface UserState {
  items: User[];
  selectedUser: User | null;

  loading: {
    fetchAll: boolean;
    fetchById: boolean;
    create: boolean;
  };

  error: {
    fetchAll: string | null;
    fetchById: string | null;
    create: string | null;
  };
}

const initialState: UserState = {
  items: [],
  selectedUser: null,

  loading: {
    fetchAll: false,
    fetchById: false,
    create: false,
  },

  error: {
    fetchAll: null,
    fetchById: null,
    create: null,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = {
        fetchAll: null,
        fetchById: null,
        create: null,
      };
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading.fetchAll = true;
        state.error.fetchAll = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error.fetchAll = action.payload ?? "Failed to fetch users";
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading.fetchById = true;
        state.error.fetchById = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading.fetchById = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error.fetchById = action.payload ?? "Failed to fetch user";
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.create = false;

        const userExists = state.items.some(
          (user) => user.id === action.payload.id,
        );

        if (!userExists) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload ?? "Failed to create user";
      });
  },
});

export const { clearUserError, clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
