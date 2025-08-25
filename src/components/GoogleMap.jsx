import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker, Circle } from '@react-google-maps/api';

const GoogleMap = ({ onLocationSelect, initialRadius = 14 }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(initialRadius);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 }); // Default center (London)

  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  // Don't automatically request location - wait for user to click button
  useEffect(() => {
    // Component mounts but doesn't request location automatically
  }, []);

    // Request user's current location
  const requestUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setError('');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };

          setCurrentLocation(location);
          setMapCenter(location);
          setIsLoading(false);

          // Call onLocationSelect with current location
          if (onLocationSelect) {
            onLocationSelect({
              address: 'Your Current Location',
              coordinates: location,
              radius: radius
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Unable to get your location. Please search for a location instead.');
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Search for location using Google Places API
  const searchLocation = async () => {
    if (!searchQuery.trim() || !mapRef.current) return;

    setIsLoading(true);
    setError('');

    try {
      const service = new window.google.maps.places.PlacesService(mapRef.current);

      const request = {
        query: searchQuery,
        fields: ['name', 'geometry', 'formatted_address']
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const place = results[0];
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name,
            address: place.formatted_address
          };

          setSearchedLocation(location);
          setMapCenter(location);
          setError('');

          // Call onLocationSelect with searched location
          if (onLocationSelect) {
            onLocationSelect({
              address: location.address,
              coordinates: { lat: location.lat, lng: location.lng },
              radius: radius
            });
          }
        } else {
          setError('Location not found. Please try a different search term.');
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchLocation();
  };

  // Handle map load
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Get the active location (searched or current)
  const activeLocation = searchedLocation || currentLocation;

  return (
    <div className="w-full h-full">
      {/* Get My Location Button */}
      {!currentLocation && !searchedLocation && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                Get Your Location
              </h3>
              <p className="text-sm text-blue-700">
                Click the button below to get your current location or search
                for a location above.
              </p>
            </div>
            <button
              onClick={requestUserLocation}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Get My Location
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-fern-500"
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="px-4 py-2 bg-fern-600 text-white rounded-md hover:bg-fern-700 focus:outline-none focus:ring-2 focus:ring-fern-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {activeLocation && (
        <div className="my-2 font-medium text-sm">
            Coordinates: {activeLocation.lat.toFixed(6)},{" "}
            {activeLocation.lng.toFixed(6)}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Map Container */}
      <div className="my-2 relative border border-gray-300 rounded-lg">
        <LoadScript
          googleMapsApiKey={
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
          }
          libraries={["places"]}
        >
          <GoogleMapComponent
            mapContainerClassName="w-full h-96 rounded-lg border border-gray-300"
            center={mapCenter}
            zoom={13}
            onLoad={onMapLoad}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            {/* Current Location Marker */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                title="Your Current Location"
              />
            )}

            {/* Searched Location Marker */}
            {searchedLocation && (
              <Marker
                position={searchedLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                title={searchedLocation.name || "Searched Location"}
              />
            )}

            {/* Radius Circle */}
            {activeLocation && (
              <Circle
                center={activeLocation}
                radius={radius * 1000} // Convert km to meters
                options={{
                  fillColor: "#10B981",
                  fillOpacity: 0.2,
                  strokeColor: "#10B981",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMapComponent>
        </LoadScript>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fern-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Location Details */}
      {activeLocation && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Selected Location
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div></div>
          </div>
        </div>
      )}

      {/* Radius Control */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Radius: {radius} km
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 km</span>
          <span>25 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        <button
          onClick={() => {
            if (activeLocation && onLocationSelect) {
              onLocationSelect({
                address: searchedLocation?.address || "Your Current Location",
                coordinates: {
                  lat: activeLocation.lat,
                  lng: activeLocation.lng,
                },
                radius: radius,
              });
            }
          }}
          disabled={!activeLocation}
          className="flex-1 px-4 py-2 bg-fern-600 text-white rounded-md hover:bg-fern-700 focus:outline-none focus:ring-2 focus:ring-fern-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Select This Location
        </button>
        <button
          onClick={() => {
            setSearchQuery("");
            setSearchedLocation(null);
            if (currentLocation) {
              setMapCenter(currentLocation);
            }
          }}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-fern-500"
        >
          Reset
        </button>
      </div>

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default GoogleMap;
