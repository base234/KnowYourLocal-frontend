import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { transmit } from "@/utils/transmit";
import Api from "@/api/api";
import logoImg from "@/assets/logo.png";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const subscription = transmit.subscription("global");

  subscription.create().then(() => {
    console.log("Subscription created");
  });

  subscription.onMessage((data) => console.log(data));

  const from = location.state?.from?.pathname || "/create-local";

  const sendPing = () => {
    Api.get("/ping-transmit").then(() => {});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        data: {
          emailOrUsername: formData.emailOrUsername,
          password: formData.password,
        },
      };

      const result = await login(payload, rememberMe);

      if (result.success) {
        // Redirect based on event creation status
        if (result.user.is_event_created === 1) {
          navigate("/dashboard");
        } else {
          navigate("/create-local");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fern-50 via-white to-lochmara-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fern-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-lochmara-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-lg w-full">
        {/* Main card */}
        <div className="px-8 pt-6 pb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
          <img src={logoImg} alt="Foursquare Logo" className="h-10 w-10" />
          <h2 className="mt-6 font-bold text-2xl">Sign in</h2>
          <p className="mt-1 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-fern-600 hover:text-fern-500 transition-colors duration-200"
            >
              Create one
            </Link>
          </p>

          <form className="mt-10" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-red-700 font-medium">
                    {error}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-fern-500 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="emailOrUsername"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-fern-500/20 focus:border-fern-500 focus:bg-white transition-all duration-200 text-sm"
                  placeholder="Enter your email address"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-fern-500 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-fern-500/20 focus:border-fern-500 focus:bg-white transition-all duration-200 text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="mt-4 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-fern-600 focus:ring-fern-500 border-gray-300 rounded transition-colors duration-200"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-700 font-medium"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-fern-600 hover:text-fern-500 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-fern-600 to-fern-700 hover:from-fern-700 hover:to-fern-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  )}
                </span>
                {isLoading ? "Signing you in..." : "Sign In"}
              </button>
            </div>
          </form>

          {import.meta.env.VITE_APP_ENV === "development" && (
            <div className="my-4 border-t border-gray-200">
              <button
                className="w-full bg-gradient-to-r from-lochmara-600 to-lochmara-700 hover:from-lochmara-700 hover:to-lochmara-800 text-white px-4 py-3 rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={sendPing}
              >
                🚀 Send Ping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
