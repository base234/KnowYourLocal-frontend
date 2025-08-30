import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";

// Layouts
import CustomerLayout from "@/layouts/CustomerLayout";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// Customer pages
import Layout from "@/pages/customer/Layout";
import Dashboard from "@/pages/customer/Dashboard";
import MyLocals from "@/pages/customer/MyLocals";
import QuickFind from "@/pages/customer/QuickFind";
import Favourites from "@/pages/customer/Favourites";
import Help from "@/pages/customer/Help";
import Guide from "@/pages/customer/Guide";

import OnboardingCreateLocal from "@/pages/customer/OnboardingCreateLocal";
import Chats from "@/pages/customer/Chats";
import MyLocal from "@/pages/customer/MyLocal";

// Error page
import Error404 from "@/pages/Error404";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Auth routes - accessible only when not authenticated */}
      <Route
        path="/auth/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <ProtectedRoute requireAuth={false}>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/reset-password/:token"
        element={
          <ProtectedRoute requireAuth={false}>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      {/* Main app routes - require auth and use CustomerLayout */}
      <Route
        element={
          <ProtectedRoute requireAuth={true}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Layout />}>
          <Route path="/create-local" element={<OnboardingCreateLocal />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locals" element={<MyLocals />} />
          <Route path="/locals/:local_id" element={<MyLocal />} />
          <Route path="/quick-find" element={<QuickFind />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/help" element={<Help />} />
          <Route path="/guide" element={<Guide />} />
        </Route>
        <Route path="/chats" element={<Chats />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
