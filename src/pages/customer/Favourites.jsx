import React, { useState } from 'react';
import { Heart, MapPin, Star, Clock, Share2, MoreVertical, Filter } from 'lucide-react';

export default function Favourites() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const favourites = [
    {
      id: 1,
      name: 'Golden Gate Viewpoint',
      description: 'Breathtaking views of the Golden Gate Bridge',
      category: 'Scenic',
      addedDate: '3 days ago',
      rating: 4.9,
      distance: '2.1 miles',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      tags: ['Photography', 'Sunset', 'Tourist']
    },
    {
      id: 2,
      name: 'Local Artisan Coffee',
      description: 'Hand-crafted coffee with locally sourced beans',
      category: 'Food & Drink',
      addedDate: '1 week ago',
      rating: 4.7,
      distance: '0.8 miles',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      tags: ['Coffee', 'Local', 'Cozy']
    },
    {
      id: 3,
      name: 'Hidden Garden Oasis',
      description: 'Secret garden perfect for meditation and peace',
      category: 'Nature',
      addedDate: '2 weeks ago',
      rating: 4.8,
      distance: '1.5 miles',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      tags: ['Peaceful', 'Nature', 'Hidden']
    },
    {
      id: 4,
      name: 'Vintage Bookstore Cafe',
      description: 'Charming bookstore with excellent coffee and pastries',
      category: 'Food & Drink',
      addedDate: '3 weeks ago',
      rating: 4.6,
      distance: '1.2 miles',
      isOpen: false,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      tags: ['Books', 'Vintage', 'Quiet']
    },
    {
      id: 5,
      name: 'Rooftop Yoga Studio',
      description: 'Sunrise yoga sessions with city skyline views',
      category: 'Wellness',
      addedDate: '1 month ago',
      rating: 4.9,
      distance: '0.9 miles',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      tags: ['Yoga', 'Sunrise', 'Wellness']
    },
    {
      id: 6,
      name: 'Street Art Alley',
      description: 'Vibrant murals and street art by local artists',
      category: 'Art & Culture',
      addedDate: '1 month ago',
      rating: 4.5,
      distance: '1.8 miles',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      tags: ['Art', 'Culture', 'Photography']
    },
  ];

  const categories = ['All', 'Food & Drink', 'Nature', 'Scenic', 'Wellness', 'Art & Culture'];

  const filteredFavourites = selectedCategory === 'all'
    ? favourites
    : favourites.filter(fav => fav.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Favourites</h1>
          <p className="mt-1 text-gray-600">Your saved locals and special places</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
            <Share2 className="w-4 h-4 mr-2" />
            Share Collection
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-razzmatazz-100 rounded-lg">
              <Heart className="w-6 h-6 text-razzmatazz-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Favourites</p>
              <p className="text-2xl font-bold text-gray-900">{favourites.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-fern-100 rounded-lg">
              <MapPin className="w-6 h-6 text-fern-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-lochmara-100 rounded-lg">
              <Star className="w-6 h-6 text-lochmara-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.7</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-razzmatazz-100 rounded-lg">
              <Clock className="w-6 h-6 text-razzmatazz-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Now</p>
              <p className="text-2xl font-bold text-gray-900">{favourites.filter(f => f.isOpen).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? 'all' : category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  (selectedCategory === 'all' && category === 'All') ||
                  (selectedCategory.toLowerCase() === category.toLowerCase())
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

      {/* Favourites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavourites.map((favourite) => (
          <div key={favourite.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={favourite.image}
                alt={favourite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                  <Heart className="w-4 h-4 text-razzmatazz-500 fill-current" />
                </button>
                <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                {favourite.isOpen ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                    Open
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Closed
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{favourite.name}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {favourite.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{favourite.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-gray-900">{favourite.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {favourite.distance}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {favourite.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-fern-50 text-fern-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Added {favourite.addedDate}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 bg-fern-500 hover:bg-fern-600 text-white text-sm rounded-lg transition-colors duration-200">
                    Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFavourites.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No favourites in this category</h3>
          <p className="text-gray-600 mb-6">Try selecting a different category or add more favourites.</p>
          <button className="px-4 py-2 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200">
            Explore Locals
          </button>
        </div>
      )}
    </div>
  );
}
