import React from "react";
import { useSession, useUser, Descope } from "@descope/react-sdk";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/logo.png";

export default function Login() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  if (!isSessionLoading && isAuthenticated) {
    if (user?.name) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fern-50 via-white to-lochmara-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fern-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-lochmara-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-lg w-full">
        <div className="px-8 pt-6 pb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
          <img src={logoImg} alt="Foursquare Logo" className="h-10 w-10" />
          <h2 className="mt-6 font-bold text-2xl">Sign in</h2>

          <div className="mt-6">
            <Descope
              flowId="sign-up-or-in"
              onSuccess={() => navigate("/dashboard")}
              onError={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
