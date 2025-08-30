import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Customer pages
import Dashboard from './pages/customer/Dashboard';
import MyLocals from './pages/customer/MyLocals';
import QuickFind from './pages/customer/QuickFind';
import Favourites from './pages/customer/Favourites';
import Help from './pages/customer/Help';
import Guide from './pages/customer/Guide';
import SubMenu1 from './pages/customer/SubMenu1';
import SubMenu2 from './pages/customer/SubMenu2';
import SubMenu3 from './pages/customer/SubMenu3';
import OnboardingCreateEvent from './pages/customer/OnboardingCreateEvent';
import Chat from './pages/customer/Chat';

// Error page
import Error404 from './pages/Error404';

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Auth routes - accessible only when not authenticated */}
      <Route path="/auth/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="/auth/register" element={
        <ProtectedRoute requireAuth={false}>
          <Register />
        </ProtectedRoute>
      } />
      <Route path="/auth/forgot-password" element={
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      } />
      <Route path="/auth/reset-password/:token" element={
        <ProtectedRoute requireAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
      } />

      {/* Main app routes - require auth and use CustomerLayout */}
      <Route element={
        <ProtectedRoute requireAuth={true}>
          <CustomerLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-locals" element={<MyLocals />} />
        <Route path="/quick-find" element={<QuickFind />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/help" element={<Help />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/sub1" element={<SubMenu1 />} />
        <Route path="/sub2" element={<SubMenu2 />} />
        <Route path="/sub3" element={<SubMenu3 />} />
        <Route path="/create-event" element={<OnboardingCreateEvent />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Legacy routes - redirect to new structure */}
      <Route path="/customer/dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="/customer/my-locals" element={<Navigate to="/my-locals" replace />} />
      <Route path="/customer/quick-find" element={<Navigate to="/quick-find" replace />} />
      <Route path="/customer/favourites" element={<Navigate to="/favourites" replace />} />
      <Route path="/customer/help" element={<Navigate to="/help" replace />} />
      <Route path="/customer/guide" element={<Navigate to="/guide" replace />} />
      <Route path="/customer/sub1" element={<Navigate to="/sub1" replace />} />
      <Route path="/customer/sub2" element={<Navigate to="/sub2" replace />} />
      <Route path="/customer/sub3" element={<Navigate to="/sub3" replace />} />
      <Route path="/customer/create-event" element={<Navigate to="/create-event" replace />} />
      <Route path="/customer/chat" element={<Navigate to="/chat" replace />} />
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
