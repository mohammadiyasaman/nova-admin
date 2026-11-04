import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import userReducer from "./Slices/userSlice";
import authReducer from "./Slices/authSlice";

const rootReducer = combineReducers({
  products: productReducer,
  users: userReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
