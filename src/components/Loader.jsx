import React from "react";
import EarthLoader from "@/components/EarthLoader";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-blue-200 to-white">
      <EarthLoader />
      <div className="mt-4 text-center">
        <div className="mt-2 text-gray-500">
          Loading your experience...
        </div>
      </div>
    </div>
  );
}
