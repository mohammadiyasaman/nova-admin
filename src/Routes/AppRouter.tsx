import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/Pages/Auth/Login/LoginPage";
import DashboardPage from "@/Pages/Dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "@/Components/Layout/AdminLayout";
import ProductsPage from "@/Pages/Products/ProductsPage";
import UsersPage from "@/Pages/Users/UsersPage";

function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default AppRouter;
