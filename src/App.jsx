import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Customer pages
import Dashboard from '@/pages/customer/Dashboard';
import OnboardingCreateEvent from '@/pages/customer/OnboardingCreateEvent';
import Chat from '@/pages/customer/Chat';

// Error page
import Error404 from '@/pages/Error404';

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Auth routes - accessible only when not authenticated */}
      <Route path="/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="/register" element={
        <ProtectedRoute requireAuth={false}>
          <Register />
        </ProtectedRoute>
      } />
      <Route path="/forgot-password" element={
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      } />
      <Route path="/reset-password/:token" element={
        <ProtectedRoute requireAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
      } />

      {/* Customer routes - require auth */}
      <Route path="/dashboard" element={
        <ProtectedRoute requireAuth={true}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-event" element={
        <ProtectedRoute requireAuth={true}>
          <OnboardingCreateEvent />
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute requireAuth={true}>
          <Chat />
        </ProtectedRoute>
      } />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
