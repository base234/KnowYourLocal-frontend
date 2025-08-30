import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "@/pages/customer/Sidebar";
import Navbar from "@/pages/customer/Navbar";
import SmartModal from "@/components/SmartModal";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebarExpanded");
      return saved !== null ? JSON.parse(saved) : true;
    } catch (error) {
      console.warn("Failed to read sidebar state from localStorage:", error);
      return true;
    }
  });
  const [showNewLocalModal, setShowNewLocalModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarExpanded", JSON.stringify(sidebarExpanded));
    } catch (error) {
      console.warn("Failed to save sidebar state to localStorage:", error);
    }
  }, [sidebarExpanded]);

  return (
    <Fragment>
      {/* New Local Modal - Rendered at layout level to appear above everything */}
      <SmartModal
        open={showNewLocalModal}
        onClose={() => setShowNewLocalModal(false)}
        header="Create New Local"
        size="xl"
        animationType="top"
        scrollable={true}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Let's create your new local
            </h3>
            <p className="text-gray-600">
              Follow these steps to set up your new local experience.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-transparent"
                placeholder="Enter local name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-transparent"
                placeholder="Describe your local..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowNewLocalModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-fern-500 hover:bg-fern-600 rounded-md transition-colors duration-200">
              Create Local
            </button>
          </div>
        </div>
      </SmartModal>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          isExpanded={sidebarExpanded}
          setIsExpanded={setSidebarExpanded}
          onOpenNewLocalModal={() => setShowNewLocalModal(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar
            isExpanded={sidebarExpanded}
            setIsExpanded={setSidebarExpanded}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="px-6 pt-3 pb-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
