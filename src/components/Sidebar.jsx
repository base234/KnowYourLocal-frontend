import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  MapPin,
  Search,
  Heart,
  MoreHorizontal,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Plus,
  Building2,
  TrendingUp
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SmartModal from './SmartModal';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(null);
  const [showNewLocalModal, setShowNewLocalModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const subMenuTimeoutRef = useRef(null);

  const menuItems = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      id: 'my-locals',
      icon: Building2,
      label: 'My Locals',
      path: '/my-locals'
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
    {
      id: 'other',
      icon: MoreHorizontal,
      label: 'Other',
      hasSubmenu: true,
      submenu: [
        { id: 'sub1', label: 'Sub menu 1', path: '/sub1' },
        { id: 'sub2', label: 'Sub menu 2', path: '/sub2' },
        { id: 'sub3', label: 'Sub menu 3', path: '/sub3' },
      ]
    },
  ];

  const bottomMenuItems = [
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
    },
  ];

  const recentLocals = [
    { id: 1, name: 'Visit to a Taj Mahal an...', color: 'bg-razzmatazz-400' },
    { id: 2, name: 'Roving around new loca...', color: 'bg-lochmara-400' },
    { id: 3, name: 'Coffee place around city', color: 'bg-fern-400' },
  ];

  const handleMouseEnter = (itemId) => {
    if (!isExpanded) {
      setHoveredItem(itemId);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      setHoveredItem(null);
    }
  };

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

  const Tooltip = ({ children, content, show }) => (
    <div className="relative">
      {children}
      {show && !isExpanded && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[9999] px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap animate-in fade-in duration-200 shadow-lg">
          {content}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </div>
  );

  const SubMenuFlyout = ({ items, show, onMouseEnter, onMouseLeave, isExpanded }) => (
    <div
      className={`absolute ${isExpanded ? 'left-full top-0 ml-1' : 'left-full top-0 ml-1'} bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[9999] min-w-48 transition-all duration-200 ${
        show ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleMenuClick(item)}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-fern-600 transition-colors duration-150"
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out relative z-50 overflow-hidden ${isExpanded ? 'w-64' : 'w-16'}`}>
        {/* Logo and App Name */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-7 h-7 bg-gradient-to-br from-fern-500 to-fern-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            {isExpanded && (
              <div className="ml-2">
                <h1 className="font-semibold text-gray-900 text-sm">{ import.meta.env.VITE_APP_NAME }</h1>
              </div>
            )}
          </div>
        </div>

        {/* New Local Button */}
        <div className="p-3 border-b border-gray-100">
          <Tooltip content="New Local" show={hoveredItem === 'new-local'}>
            <button
              onClick={() => setShowNewLocalModal(true)}
              onMouseEnter={() => handleMouseEnter('new-local')}
              onMouseLeave={handleMouseLeave}
              className={`w-full flex items-center justify-center bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200 ${
                isExpanded ? 'px-3 py-2' : 'p-2'
              }`}
            >
              <Plus className="w-4 h-4" />
              {isExpanded && <span className="ml-2 font-medium text-sm">New Local</span>}
            </button>
          </Tooltip>
        </div>

        {/* Main Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          <nav className="space-y-0.5 px-2 w-full">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <div key={item.id} className="relative">
                  <Tooltip content={item.label} show={hoveredItem === item.id}>
                    <button
                      onClick={() => !item.hasSubmenu && handleMenuClick(item)}
                      onMouseEnter={() => {
                        handleMouseEnter(item.id);
                        if (item.hasSubmenu) {
                          handleSubmenuMouseEnter(item.id);
                        }
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave();
                        if (item.hasSubmenu) {
                          handleSubmenuMouseLeave();
                        }
                      }}
                      className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                        isExpanded ? 'px-2 py-2' : 'p-2 justify-center'
                      } ${
                        active
                          ? 'bg-fern-50 text-fern-600 border-r-2 border-fern-500'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-fern-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {isExpanded && (
                        <>
                          <span className="ml-2 flex-1 text-left text-sm truncate">{item.label}</span>
                          {item.hasSubmenu && (
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          )}
                        </>
                      )}
                    </button>
                  </Tooltip>

                  {/* Submenu Flyout */}
                  {item.hasSubmenu && (
                    <SubMenuFlyout
                      items={item.submenu}
                      show={showSubMenu === item.id}
                      onMouseEnter={() => handleSubmenuMouseEnter(item.id)}
                      onMouseLeave={handleSubmenuMouseLeave}
                      isExpanded={isExpanded}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="mx-2 my-2 border-t border-gray-200"></div>

          {/* Bottom Menu Items */}
          <nav className="space-y-0.5 px-2 w-full">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <div key={item.id} className="relative">
                  <Tooltip content={item.label} show={hoveredItem === item.id}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                      className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                        isExpanded ? 'px-2 py-2' : 'p-2 justify-center'
                      } ${
                        active
                          ? 'bg-fern-50 text-fern-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-fern-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {isExpanded && <span className="ml-2 text-sm truncate">{item.label}</span>}
                    </button>
                  </Tooltip>
                </div>
              );
            })}
          </nav>

          {/* Recent Locals */}
          {isExpanded && (
            <div className="px-2 mt-4 w-full">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Recent Locals
              </h3>
              <div className="space-y-1">
                {recentLocals.map((local) => (
                  <button
                    key={local.id}
                    className="w-full flex items-center text-left px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className={`w-2 h-2 rounded-full ${local.color} flex-shrink-0`}></div>
                    <span className="ml-2 text-xs text-gray-700 truncate">{local.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Banner */}
        <div className="p-3 border-t border-gray-100">
          {isExpanded ? (
            <div className="bg-gradient-to-r from-fern-50 to-lochmara-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-gray-900">Upgrade Plan</h4>
                <TrendingUp className="w-3 h-3 text-fern-500" />
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Credits used</span>
                  <span>75/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-fern-400 to-fern-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <button className="w-full bg-fern-500 hover:bg-fern-600 text-white text-xs font-medium py-1.5 px-2 rounded-md transition-colors duration-200">
                Upgrade Now
              </button>
            </div>
          ) : (
            <Tooltip content="Upgrade Plan" show={hoveredItem === 'upgrade'}>
              <button
                onMouseEnter={() => handleMouseEnter('upgrade')}
                onMouseLeave={handleMouseLeave}
                className="w-full flex items-center justify-center p-2 bg-gradient-to-r from-fern-500 to-fern-600 text-white rounded-lg hover:from-fern-600 hover:to-fern-700 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* New Local Modal */}
      <SmartModal
        open={showNewLocalModal}
        onClose={() => setShowNewLocalModal(false)}
        header="Create New Local"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Let's create your new local</h3>
            <p className="text-gray-600">Follow these steps to set up your new local experience.</p>
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


    </>
  );
};

export default Sidebar;
