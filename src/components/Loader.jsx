import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-fern-100 animate-pulse">
      <svg className="h-10 w-10 text-fern-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="mt-4">
          <div className="text-lg font-medium text-gray-900">Loading...</div>
          <div className="mt-2 text-sm text-gray-500">Please wait while we set up your experience</div>
        </div>
      </div>
    </div>
  );
}
