import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Clock, Compass } from 'lucide-react';

export default function QuickFind() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const searchResults = [
    {
      id: 1,
      name: 'Sunset Cafe',
      description: 'Cozy coffee shop with amazing sunset views',
      category: 'Food & Drink',
      distance: '0.2 miles',
      rating: 4.8,
      reviews: 124,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'City Library',
      description: 'Quiet study space with excellent WiFi',
      category: 'Education',
      distance: '0.5 miles',
      rating: 4.6,
      reviews: 89,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Riverside Park',
      description: 'Beautiful park perfect for morning jogs',
      category: 'Outdoor',
      distance: '0.8 miles',
      rating: 4.9,
      reviews: 256,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Tech Hub Co-working',
      description: 'Modern workspace for remote professionals',
      category: 'Work',
      distance: '1.2 miles',
      rating: 4.7,
      reviews: 167,
      isOpen: false,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
  ];

  const filters = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'food', label: 'Food & Drink', icon: MapPin },
    { id: 'outdoor', label: 'Outdoor', icon: MapPin },
    { id: 'work', label: 'Work', icon: MapPin },
    { id: 'education', label: 'Education', icon: MapPin },
  ];

  const quickSuggestions = [
    'Coffee shops near me',
    'Parks and recreation',
    'Study spaces',
    'Restaurants',
    'Shopping centers',
    'Gyms and fitness',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quick Find</h1>
        <p className="mt-1 text-gray-600">Discover amazing locals around you</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for locals, places, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
          <button className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              className="px-3 py-2 bg-gray-100 hover:bg-fern-100 hover:text-fern-700 text-gray-600 text-sm rounded-full transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors duration-200 ${
                  selectedFilter === filter.id
                    ? 'border-fern-500 bg-fern-50 text-fern-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
            <span className="text-sm text-gray-500">{searchResults.length} results found</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {searchResults.map((result) => (
            <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex space-x-4">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{result.name}</h4>
                      <p className="text-gray-600 mt-1">{result.description}</p>
                    </div>
                    <div className="flex items-center ml-4">
                      {result.isOpen ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                          Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Closed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mt-3 space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{result.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({result.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {result.distance}
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {result.category}
                    </span>
                  </div>

                  <div className="flex items-center mt-4 space-x-3">
                    <button className="flex items-center px-4 py-2 bg-fern-500 hover:bg-fern-600 text-white text-sm rounded-lg transition-colors duration-200">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors duration-200">
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
