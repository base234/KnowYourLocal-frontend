import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token =
        localStorage.getItem("ks-token") || sessionStorage.getItem("ks-token");

      if (token) {
        try {
          const response = await Api.get("/auth/me");
          const userData = response.data.data;

          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem("ks-token");
          sessionStorage.removeItem("ks-token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (userData, rememberMe = false) => {
    try {
      const response = await Api.post("/auth/login", userData);
      console.log("Login response:", response.data); // Debug log

      const { token, data: userInfo } = response.data;

      // Store token based on remember me preference
      if (rememberMe) {
        localStorage.setItem("ks-token", token);
        // Set expiration for 7 days
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        localStorage.setItem("ks-token-expiry", expirationDate.toISOString());
      } else {
        sessionStorage.setItem("ks-token", token);
      }

      setUser(userInfo);
      setIsAuthenticated(true);

      return { success: true, user: userInfo };
    } catch (error) {
      throw error;
    }
  };

  const loginWithVerificationCode = async (userData, rememberMe = false) => {
    try {
      const response = await Api.post("/auth/login/verify-code", userData);
      console.log("Login verification response:", response.data); // Debug log

      const { token, data: userInfo } = response.data;

      // Store token based on remember me preference
      if (rememberMe) {
        localStorage.setItem("ks-token", token);
        // Set expiration for 7 days
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        localStorage.setItem("ks-token-expiry", expirationDate.toISOString());
      } else {
        sessionStorage.setItem("ks-token", token);
      }

      setUser(userInfo);
      setIsAuthenticated(true);

      return { success: true, user: userInfo };
    } catch (error) {
      throw error;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("ks-token");
    localStorage.removeItem("ks-token-expiry");
    sessionStorage.removeItem("ks-token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

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

  // Check token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const expiry = localStorage.getItem("ks-token-expiry");
      if (expiry) {
        const expirationDate = new Date(expiry);
        if (new Date() > expirationDate) {
          logout();
        }
      }
    };

    // Check on mount and set up interval
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [logout]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithVerificationCode,
    logout,
    updateUser,
    markEventAsCreated,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
