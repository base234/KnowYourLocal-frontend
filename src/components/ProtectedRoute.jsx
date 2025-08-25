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

  // Show loader while checking authentication status
  if (isLoading) {
    return <Loader />;
  }

  // For routes that require authentication
  if (requireAuth) {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If role-based access is required
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user role
      switch (user.role) {
        case "customer":
          return <Navigate to="/dashboard" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }

    // Check if customer needs to create their first event
    if (
      user?.role === "customer" &&
      user?.is_event_created !== 1 &&
      location.pathname !== "/create-event"
    ) {
      // If customer hasn't created any events and is not on create-event page, redirect to create-event
      return <Navigate to="/create-event" replace />;
    }

    // If customer has created events but is on create-event page, redirect to dashboard
    if (
      user?.role === "customer" &&
      user?.is_event_created === 1 &&
      location.pathname === "/create-event"
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // For routes that should not be accessible when authenticated (like login/register)
  if (!requireAuth && isAuthenticated) {
    // If user has created events, redirect to appropriate dashboard
    if (user?.is_event_created === 1) {
      switch (user?.role) {
        case "customer":
          return <Navigate to="/dashboard" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    } else {
      // If no events created yet, redirect to create-event
      return <Navigate to="/create-event" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
