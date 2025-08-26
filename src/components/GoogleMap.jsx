import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  GoogleMap as GoogleMapComponent,
  LoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { LoaderCircle, MapPin, Search } from "lucide-react";
import EarthLoader from "@/components/EarthLoader.jsx";

const GoogleMap = ({ onLocationSelect, initialRadius = 14 }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [radius, setRadius] = useState(initialRadius);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLocation, setHasLocation] = useState(false);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 }); // Default center (London)

  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  // Check if we have any location
  useEffect(() => {
    setHasLocation(!!(currentLocation || searchedLocation));
  }, [currentLocation, searchedLocation]);

  // Request user's current location
  const requestUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setError("");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };

          setCurrentLocation(location);
          setMapCenter(location);
          setHasLocation(true);
          setIsLoading(false);

          // Call onLocationSelect with current location
          if (onLocationSelect) {
            onLocationSelect({
              address: "Your Current Location",
              coordinates: location,
              radius: radius,
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(
            "Unable to get your location. Please search for a location instead."
          );
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Search for location using Google Places API
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      setError(
        "Google Maps API is not loaded. Please wait a moment and try again."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create a temporary div for the Places service
      const tempDiv = document.createElement("div");
      const service = new window.google.maps.places.PlacesService(tempDiv);

      const request = {
        query: searchQuery,
        fields: ["name", "geometry", "formatted_address"],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results.length > 0
        ) {
          const place = results[0];
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name,
            address: place.formatted_address,
          };

          setSearchedLocation(location);
          setMapCenter(location);
          setHasLocation(true);
          setError("");

          // Call onLocationSelect with searched location
          if (onLocationSelect) {
            onLocationSelect({
              address: location.address,
              coordinates: { lat: location.lat, lng: location.lng },
              radius: radius,
            });
          }
        } else {
          setError("Location not found. Please try a different search term.");
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please try again.");
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
    setIsGoogleMapsLoaded(true);
  };

  // Handle Google Maps script load error
  const handleScriptLoadError = () => {
    setError(
      "Failed to load Google Maps. Please check your internet connection and try again."
    );
  };

  // Get the active location (searched or current)
  const activeLocation = searchedLocation || currentLocation;

  // If no location yet, show the location input and get location button
  if (!hasLocation) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Location Search Input */}
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="flex space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a location (e.g., Times Square, New York)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Search button only appears when there's text in the input */}
              {searchQuery.trim() && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : "Search"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Get My Location Button */}
        <div className="w-full p-0.5 border border-blue-200 rounded-lg">
          <div className="w-full p-6 bg-gradient-to-tl from-blue-100 to-white rounded-lg text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-blue-200 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">
                  Get Your Current Location
                </h3>
                <p className="max-w-md text-sm text-gray-600 mb-4">
                  To show you the best places, we need access to your location.
                </p>
                <button
                  onClick={requestUserLocation}
                  disabled={isLoading}
                  className="px-4 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      <span>Getting location...</span>
                    </div>
                  ) : (
                    "Get My Location"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>
    );
  }

  // If we have a location, show the map and radius slider
  return (
    <div className="w-full">
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

      <div className="flex items-start gap-4">
        <div className="w-1/2">
          {/* Location Search and Get My Location Controls */}
          <div className="mb-6 space-y-4">
            {/* Location Search Input */}
            <div>
              <form onSubmit={handleSearchSubmit} className="flex space-x-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a new location..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {/* Search button only appears when there's text in the input */}
                  {searchQuery.trim() && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "..." : "Search"}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Get My Location Button */}
            <div className="w-full p-0.5 border border-blue-200 rounded-lg">
              <div className="w-full p-4 bg-gradient-to-tl from-blue-100 to-white rounded-lg text-center">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-200 rounded-full">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-600 text-sm">
                      Get Your Current Location
                    </h4>
                  </div>
                  <button
                    onClick={requestUserLocation}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        <span>Getting location...</span>
                      </div>
                    ) : (
                      "Get My Location"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <hr className="my-10 border-gray-300 border-dashed" />

          {/* Location Details */}
          {activeLocation && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Selected Location
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>
                    {activeLocation.address ||
                      activeLocation.name ||
                      "Your Current Location"}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Coordinates: {activeLocation.lat.toFixed(6)},{" "}
                  {activeLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}

          {/* Radius Control */}
          <div className="mt-10 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Search Radius: {radius} km
            </label>
            <input
              type="range"
              min="1"
              max="25"
              step={1}
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1 km</span>
              <span>5 km</span>
              <span>10 km</span>
              <span>15 km</span>
              <span>20 km</span>
              <span>25 km</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          {/* Map Container */}
          <div className="relative rounded-lg mb-6">
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
              libraries={["places"]}
              onError={handleScriptLoadError}
            >
              <GoogleMapComponent
                mapContainerClassName="w-full h-[512px] rounded-lg border border-gray-300"
                center={mapCenter}
                zoom={14}
                onLoad={onMapLoad}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: true,
                  fullscreenControl: true,
                }}
              >
                {/* Only render markers and circles when Google Maps API is loaded */}
                {isGoogleMapsLoaded && window.google && window.google.maps && (
                  <>
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
                  </>
                )}
              </GoogleMapComponent>
            </LoadScript>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="opacity-50">
                  <EarthLoader />
                </div>
              </div>
            )}

            {/* Google Maps Loading Indicator */}
            {!isGoogleMapsLoaded && (
              <div className="absolute inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <EarthLoader />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
