import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Get initials from first and last name
  const getInitials = () => {
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';
    const firstInitial = firstName.charAt(0)?.toUpperCase() || '';
    const lastInitial = lastName.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial || 'U';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 transition-all duration-200"
      >
        <div className="h-8 w-8 rounded-full bg-fern-600 flex items-center justify-center shadow-sm hover:bg-fern-700 transition-colors duration-200">
          <span className="text-sm font-medium text-white">
            {getInitials()}
          </span>
        </div>
        <span className="hidden md:block text-gray-700">{user?.first_name}</span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-100 z-50 transition-all duration-200 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-1">
          <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 bg-gray-50 rounded-t-lg">
            <div className="font-medium">{user?.first_name} {user?.last_name}</div>
            <div className="text-gray-500 text-xs mt-1">{user?.email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 rounded-b-lg"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
