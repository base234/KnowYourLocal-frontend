import React, { useState, useRef, Fragment, useEffect } from 'react';
import {
  Home,
  Search,
  Heart,
  HelpCircle,
  BookOpen,
  Plus,
  Building2,
  TrendingUp,
  Settings
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import Api from '@/api/api';

const Sidebar = ({ isExpanded, setIsExpanded, onOpenNewLocalModal }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const subMenuTimeoutRef = useRef(null);
  const [locals, setLocals] = useState([]);

  const menuItems = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      id: 'locals',
      icon: Building2,
      label: 'My Locals',
      path: '/locals'
    },
    {
      id: 'quick-find',
      icon: Search,
      label: 'Quick Find',
      path: '/quick-find'
    },
    {
      id: 'favourites',
      icon: Heart,
      label: 'Favourites',
      path: '/favourites'
    },
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      path: '/settings'
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help and Support',
      path: '/help'
    },
    {
      id: 'guide',
      icon: BookOpen,
      label: 'Quick Guide',
      path: '/guide'
    }
  ];

  const recentLocals = [
    { id: 1, name: 'Visit to a Taj Mahal an...', color: 'bg-razzmatazz-400' },
    { id: 2, name: 'Roving around new loca...', color: 'bg-lochmara-400' },
    { id: 3, name: 'Coffee place around city', color: 'bg-fern-400' },
  ];

  // Fetch locals data
  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const response = await Api.get("/locals");
        if (response.data && response.data.data) {
          setLocals(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching locals:", error);
      }
    };

    fetchLocals();
  }, []);


  const handleSubmenuMouseEnter = (itemId) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    setShowSubMenu(itemId);
  };

  const handleSubmenuMouseLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => {
      setShowSubMenu(null);
    }, 300);
  };

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-75 ease-in-out relative z-50 overflow-hidden ${
        isExpanded ? "w-64" : "w-14"
      }`}
    >
      {/* Logo and App Name */}
      <div
        className={`border-b border-gray-100 ${isExpanded ? "p-2" : "py-2"}`}
      >
        <div
          className={`flex items-center ${isExpanded ? "" : "justify-center"}`}
        >
          <div className="w-9 h-9 rounded-md flex items-center justify-center">
            <img
              src={logoImg}
              alt="Foursquare Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          {isExpanded && (
            <div className="ml-2">
              <h1 className="font-semibold text-sm">
                {import.meta.env.VITE_APP_NAME}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* New Local Button */}
      <div
        className={`border-b border-gray-100 ${
          isExpanded ? "py-2 px-3" : "px-2 py-2"
        }`}
      >
        <Link
          to="/locals/new"
          onClick={onOpenNewLocalModal}
          className={`w-full text-center font-semibold text-sm hover:text-gray-700 bg-gradient-to-b from-white to-gray-100 hover:to-gray-200 border border-gray-300 rounded-md cursor-pointer flex items-center justify-center space-x-2 ${
            isExpanded ? "pl-1 pr-5 py-3" : "py-2.5 px-1.5"
          }`}
        >
          <Plus className="w-4 h-4" />
          {isExpanded && <span className="font-medium text-sm">New Local</span>}
        </Link>
      </div>

      {/* Main Menu Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        <nav className="w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center cursor-pointer border-r-2 ${
                    isExpanded ? "px-4 py-3" : "py-3 justify-center"
                  } ${
                    active
                      ? "bg-fern-50 text-fern-600 border-fern-500"
                      : "text-gray-700 border-transparent hover:bg-gray-50 hover:text-fern-600"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {isExpanded && (
                    <Fragment>
                      <span className="ml-2 font-medium flex-1 text-left text-sm truncate">
                        {item.label}
                      </span>
                    </Fragment>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-2 border-t border-gray-200"></div>

        {/* Bottom Menu Items */}
        <nav className="w-full">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center border-r-2 cursor-pointer ${
                    isExpanded ? "px-4 py-3" : "py-3 justify-center"
                  } ${
                    active
                      ? "bg-fern-50 text-fern-600 border-fern-500"
                      : "text-gray-700 border-transparent hover:bg-gray-50 hover:text-fern-600"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {isExpanded && (
                    <span className="ml-2 font-medium text-sm truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-2 border-t border-gray-200"></div>

        {/* Recent Locals */}
        {/* {isExpanded && (
          <div className="my-4 w-full">
            <h2 className="text-xs px-4 font-medium text-gray-400 uppercase tracking-wider">
              Recent Locals
            </h2>
            <div className="mt-2">
              {recentLocals.map((local) => (
                <button
                  key={local.id}
                  className="py-2 px-4 w-full text-sm text-gray-600 hover:text-gray-800 flex items-center text-left hover:bg-gray-100 cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${local.color} flex-shrink-0`}
                  ></div>
                  <span className="ml-4 truncate">
                    {local.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )} */}

        {/* My Locals */}
        {isExpanded && locals.length > 0 && (
          <div className="my-4 w-full">
            <h2 className="text-xs px-4 font-medium text-gray-400 uppercase tracking-wider">
              RECENT LOCALS
            </h2>
            <div className="mt-2">
              {locals.slice(0, 3).map((local) => (
                <button
                  key={local.id}
                  onClick={() => navigate(`/locals/${local.id}`)}
                  className="py-2 px-4 w-full text-sm text-gray-600 hover:text-gray-800 flex items-center text-left hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-fern-400 flex-shrink-0"></div>
                  <span className="ml-4 truncate">
                    {local.name || local.title || 'Unnamed Local'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Banner */}
      <div className="p-2 border-t border-gray-100">
        {isExpanded ? (
          <div className="bg-gradient-to-r from-fern-50 to-lochmara-50 rounded-lg p-3">
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Credits used</span>
                <span>75%</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-lochmara-400 to-lochmara-500 h-1.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <button className="w-full py-2.5 px-2 font-semibold text-xs text-center bg-gray-50 border border-gray-300 rounded-md">
            75%
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
