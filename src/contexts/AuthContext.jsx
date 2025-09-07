import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";
import { useSession, useUser, useDescope } from "@descope/react-sdk";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user: descopeUser, isUserLoading } = useUser();
  const { logout: descopeLogout } = useDescope();

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated) {
        setUser(null);
        return;
      }
      try {
        const response = await Api.get("/auth/me");
        const userData = response.data.data;
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };
    if (!isSessionLoading) {
      loadProfile();
    }
  }, [isAuthenticated, isSessionLoading]);

  const login = async () => {
    throw new Error("Legacy login is disabled. Use Descope <Descope flowId>.");
  };

  const loginWithVerificationCode = async () => {
    throw new Error("Legacy login is disabled. Use Descope <Descope flowId>.");
  };

  const logout = useCallback(() => {
    descopeLogout();
    setUser(null);
    navigate("/login");
  }, [descopeLogout, navigate]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const markEventAsCreated = () => {
    if (user) {
      setUser({ ...user, is_event_created: 1 });
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await Api.get("/auth/me");
      const userData = response.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      logout();
      throw error;
    }
  };

  // Token expiration is handled by Descope SDK

  const value = {
    user,
    isAuthenticated,
    isLoading: isSessionLoading || isUserLoading,
    login,
    loginWithVerificationCode,
    logout,
    updateUser,
    markEventAsCreated,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
