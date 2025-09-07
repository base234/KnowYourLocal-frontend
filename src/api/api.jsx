import axios from "axios";
import { getSessionToken } from "@descope/react-sdk";

// Create an Axios instance
const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API || "http://localhost:3333",
  // timeout: 5000, // Optional: Set timeout for requests
});

// Add a request interceptor to attach headers (e.g., API key, token)
Api.interceptors.request.use(
  (config) => {
    const token = getSessionToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't override Content-Type for FormData (file uploads)
    if (config.data instanceof FormData) {
      // Remove Content-Type header to let browser set it with boundary for FormData
      delete config.headers["Content-Type"];
    }

    // Optional: Add custom headers (e.g., API keys)
    // config.headers["X-API-KEY"] = "your-api-key"; // Replace with your API key if applicable
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized or global errors
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
