import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
  allowedRoles = [],
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (requireAuth) {
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      switch (user.role) {
        case "customer":
          return <Navigate to="/dashboard" replace />;
        default:
          return <Navigate to="/auth/login" replace />;
      }
    }

    if (
      user?.role === "customer" &&
      user?.is_event_created !== 1 &&
      location.pathname !== "/create-local"
    ) {
      return <Navigate to="/create-local" replace />;
    }

    if (
      user?.role === "customer" &&
      user?.is_event_created === 1 &&
      location.pathname === "/create-local"
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (!requireAuth && isAuthenticated) {
    if (user?.is_event_created === 1) {
      switch (user?.role) {
        case "customer":
          return <Navigate to="/dashboard" replace />;
        default:
          return <Navigate to="/auth/login" replace />;
      }
    } else {
      return <Navigate to="/create-local" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
