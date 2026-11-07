import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "@/Components/Layout/AdminLayout";

const LoginPage = lazy(() => import("@/Pages/Auth/Login/LoginPage"));
const DashboardPage = lazy(() => import("@/Pages/Dashboard/DashboardPage"));
const ProductsPage = lazy(() => import("@/Pages/Products/ProductsPage"));
const UsersPage = lazy(() => import("@/Pages/Users/UsersPage"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
