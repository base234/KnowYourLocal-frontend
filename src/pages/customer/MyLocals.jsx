import React from 'react';
import { MapPin, Calendar, Heart, Share2, MoreVertical } from 'lucide-react';

export default function MyLocals() {
  const locals = [
    {
      id: 1,
      name: 'Coffee Corner Downtown',
      description: 'Great coffee spot in the heart of the city',
      category: 'Food & Drink',
      createdAt: '2 days ago',
      favorites: 23,
      visits: 45,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      color: 'bg-fern-400'
    },
    {
      id: 2,
      name: 'Central Park Bench',
      description: 'Peaceful spot for reading and relaxation',
      category: 'Outdoor',
      createdAt: '5 days ago',
      favorites: 18,
      visits: 32,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      color: 'bg-lochmara-400'
    },
    {
      id: 3,
      name: 'Pizza Palace',
      description: 'Best pizza in town with amazing atmosphere',
      category: 'Food & Drink',
      createdAt: '1 week ago',
      favorites: 56,
      visits: 78,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      color: 'bg-razzmatazz-400'
    },
    {
      id: 4,
      name: 'Beach Volleyball Court',
      description: 'Fun spot for beach volleyball with friends',
      category: 'Sports',
      createdAt: '2 weeks ago',
      favorites: 34,
      visits: 67,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      color: 'bg-fern-400'
    },
  ];

  const categories = ['All', 'Food & Drink', 'Outdoor', 'Sports', 'Entertainment'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Locals</h1>
          <p className="mt-1 text-gray-600">Manage and explore your created locals</p>
        </div>
        <button className="bg-fern-500 hover:bg-fern-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Create New Local
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  category === 'All'
                    ? 'bg-fern-100 text-fern-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Locals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locals.map((local) => (
          <div key={local.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={local.image}
                alt={local.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <div className={`w-3 h-3 rounded-full ${local.color}`}></div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{local.name}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {local.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{local.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {local.createdAt}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {local.favorites}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {local.visits}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="flex items-center text-fern-600 hover:text-fern-700 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Load More Locals
        </button>
      </div>
    </div>
  );
}
