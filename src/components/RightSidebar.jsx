import React, { useState } from "react";
import { MessageCircle, Heart, MapPin, X, Sparkles, TrendingUp, Clock, Home } from "lucide-react";
import ChatTab from "@/components/ChatTab";

const RightSidebar = ({ local }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    {
      id: "chat",
      icon: MessageCircle,
      label: "AI Chat",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      activeBg: "bg-blue-100",
      description: "Chat with AI assistant"
    },
    {
      id: "favourites",
      icon: Heart,
      label: "Favourites",
      color: "text-red-600",
      bgColor: "bg-red-50",
      hoverBg: "hover:bg-red-100",
      activeBg: "bg-red-100",
      description: "Your saved places"
    },
    {
      id: "nearby",
      icon: MapPin,
      label: "Nearby",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
      activeBg: "bg-green-100",
      description: "Places around you"
    },
    {
      id: "info",
      icon: Sparkles,
      label: "Local Info",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
      activeBg: "bg-purple-100",
      description: "Local details & stats"
    }
  ];

  const handleTabClick = (tabId) => {
    if (activeTab === tabId) {
      setActiveTab(null);
      setIsExpanded(false);
    } else {
      setActiveTab(tabId);
      setIsExpanded(true);
    }
  };

  const closeSidebar = () => {
    setActiveTab(null);
    setIsExpanded(false);
  };

  const renderTabContent = () => {
    return (
      <>
        <div className={`${activeTab === 'chat' ? 'block' : 'hidden'}`}>
          <ChatTab local={local} />
        </div>
        <div className={`${activeTab === 'favourites' ? 'block' : 'hidden'}`}>
          <FavouritesContent />
        </div>
        <div className={`${activeTab === 'nearby' ? 'block' : 'hidden'}`}>
          <NearbyContent />
        </div>
        <div className={`${activeTab === 'info' ? 'block' : 'hidden'}`}>
          <LocalInfoContent />
        </div>
      </>
    );
  };

  return (
    <>
      {/* Right Sidebar Tabs */}
      <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] z-50 flex items-center">
        <div className="bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl rounded-l-xl p-2 space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <div key={tab.id} className="relative group">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform cursor-pointer ${
                    isActive
                      ? `${tab.activeBg} ${tab.color} ring-2 ring-white`
                      : `${tab.bgColor} text-gray-600 ${tab.hoverBg}`
                  }`}
                  title={`${tab.label} - ${tab.description}`}
                >
                  <Icon className="w-6 h-6" />
                </button>

                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                    {tab.label}
                  </div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Content Panel */}
      {isExpanded && (
        <div className="fixed right-16 top-14 h-[calc(100vh-4rem)] w-[420px] bg-white/98 backdrop-blur-sm border border-gray-200 z-40 transform transition-all duration-500 ease-in-out overflow-hidden rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                tabs.find(tab => tab.id === activeTab)?.bgColor
              }`}>
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon, {
                  className: `w-5 h-5 ${tabs.find(tab => tab.id === activeTab)?.color}`
                })}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                <p className="text-xs text-gray-500">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-5rem)] overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
            {renderTabContent()}
          </div>
        </div>
      )}
    </>
  );
};

// Content Components
const FavouritesContent = () => {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true
    },
    {
      id: 2,
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.3,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: true
    },
    {
      id: 3,
      name: "Burger House",
      cuisine: "American",
      rating: 4.1,
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: false
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-gray-900">Your Favourites</h4>
        <span className="text-sm text-gray-500">{restaurants.length} places</span>
      </div>

      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {restaurant.name}
                    </h5>
                    <p className="text-sm text-gray-600 truncate">{restaurant.cuisine}</p>
                  </div>
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">{restaurant.distance}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    restaurant.isOpen
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {restaurant.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NearbyContent = () => {
  const nearbyPlaces = [
    {
      id: 1,
      name: "Coffee Corner",
      type: "Cafe",
      distance: "0.3 km",
      open: true,
      rating: 4.2,
      icon: "☕"
    },
    {
      id: 2,
      name: "Grocery Store",
      type: "Shopping",
      distance: "0.7 km",
      open: true,
      rating: 4.0,
      icon: "🛒"
    },
    {
      id: 3,
      name: "Gas Station",
      type: "Service",
      distance: "1.1 km",
      open: false,
      rating: 3.8,
      icon: "⛽"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-gray-900">Nearby Places</h4>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>Within 2km</span>
        </div>
      </div>

      <div className="space-y-4">
        {nearbyPlaces.map((place) => (
          <div key={place.id} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                  {place.icon}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {place.name}
                  </h5>
                  <p className="text-sm text-gray-600">{place.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-700">{place.distance}</span>
                  <div className={`w-3 h-3 rounded-full ${place.open ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs text-gray-600">{place.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LocalInfoContent = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-gray-900">Local Information</h4>
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Active</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Local Overview */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-lg">Pune Local</h5>
              <p className="text-sm text-gray-600">Your current local area</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Radius</span>
                <span className="text-sm font-semibold text-gray-900">
                  6 km
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Status</span>
                <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Latitude</span>
                <span className="text-sm font-semibold text-gray-900">
                  12.9767936
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Longitude</span>
                <span className="text-sm font-semibold text-gray-900">
                  77.590082
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h5 className="font-bold text-gray-900">Quick Stats</h5>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-2xl font-bold text-blue-700">24</div>
              <div className="text-sm text-blue-600 font-medium">
                Places Found
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-2xl font-bold text-green-700">8</div>
              <div className="text-sm text-green-600 font-medium">
                Favourites
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h5 className="font-bold text-gray-900">Recent Activity</h5>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700 flex-1">
                New place added to favourites
              </span>
              <span className="text-xs text-gray-500 font-medium">2h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 flex-1">
                Location updated
              </span>
              <span className="text-xs text-gray-500 font-medium">1d ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700 flex-1">
                Local created
              </span>
              <span className="text-xs text-gray-500 font-medium">3d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
