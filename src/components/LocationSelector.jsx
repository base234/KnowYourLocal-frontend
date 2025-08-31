import React, { useState, useEffect } from "react";
import { Search, MapPin, Navigation, X } from "lucide-react";
import SmartModal from "./SmartModal.jsx";

export default function LocationSelector({ open, onClose, onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Popular cities with coordinates and icons
  const popularCities = [
    {
      name: "Mumbai",
      lat: 19.076,
      lng: 72.8777,
      state: "Maharashtra",
      icon: "🏙️",
    },
    { name: "Delhi", lat: 28.7041, lng: 77.1025, state: "Delhi", icon: "🏛️" },
    {
      name: "Bangalore",
      lat: 12.9716,
      lng: 77.5946,
      state: "Karnataka",
      icon: "🌳",
    },
    {
      name: "Hyderabad",
      lat: 17.385,
      lng: 78.4867,
      state: "Telangana",
      icon: "🏰",
    },
    {
      name: "Chennai",
      lat: 13.0827,
      lng: 80.2707,
      state: "Tamil Nadu",
      icon: "🌊",
    },
    {
      name: "Kolkata",
      lat: 22.5726,
      lng: 88.3639,
      state: "West Bengal",
      icon: "🎭",
    },
    {
      name: "Pune",
      lat: 18.5204,
      lng: 73.8567,
      state: "Maharashtra",
      icon: "🎓",
    },
    {
      name: "Ahmedabad",
      lat: 23.0225,
      lng: 72.5714,
      state: "Gujarat",
      icon: "🧵",
    },
    {
      name: "Jaipur",
      lat: 26.9124,
      lng: 75.7873,
      state: "Rajasthan",
      icon: "🕌",
    },
    {
      name: "Lucknow",
      lat: 26.8467,
      lng: 80.9462,
      state: "Uttar Pradesh",
      icon: "🍖",
    },
    {
      name: "Kanpur",
      lat: 26.4499,
      lng: 80.3319,
      state: "Uttar Pradesh",
      icon: "🏭",
    },
    {
      name: "Nagpur",
      lat: 21.1458,
      lng: 79.0882,
      state: "Maharashtra",
      icon: "🍊",
    },
    {
      name: "Indore",
      lat: 22.7196,
      lng: 75.8577,
      state: "Madhya Pradesh",
      icon: "🍽️",
    },
    {
      name: "Thane",
      lat: 19.2183,
      lng: 72.9781,
      state: "Maharashtra",
      icon: "🏢",
    },
    {
      name: "Bhopal",
      lat: 23.2599,
      lng: 77.4126,
      state: "Madhya Pradesh",
      icon: "🌺",
    },
    {
      name: "Visakhapatnam",
      lat: 17.6868,
      lng: 83.2185,
      state: "Andhra Pradesh",
      icon: "⚓",
    },
    { name: "Patna", lat: 25.5941, lng: 85.1376, state: "Bihar", icon: "🕉️" },
    {
      name: "Vadodara",
      lat: 22.3072,
      lng: 73.1812,
      state: "Gujarat",
      icon: "🎨",
    },
    {
      name: "Ghaziabad",
      lat: 28.6692,
      lng: 77.4538,
      state: "Uttar Pradesh",
      icon: "🏘️",
    },
    {
      name: "Ludhiana",
      lat: 30.901,
      lng: 75.8573,
      state: "Punjab",
      icon: "🧥",
    },
  ];

  // Filter popular cities based on search
  const filteredPopularCities = popularCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search for cities using OpenStreetMap Nominatim API
  const searchCities = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&countrycodes=in&limit=10`
      );
      const data = await response.json();

      const cities = data.map((item) => ({
        name: item.display_name.split(",")[0],
        fullName: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        state: item.display_name.split(",").slice(-3, -1).join(", ").trim(),
      }));

      setSearchResults(cities);
    } catch (error) {
      console.error("Error searching cities:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Detect user's current location
  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get city name
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        )
          .then((response) => response.json())
          .then((data) => {
            const cityName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Current Location";
            const locationData = {
              name: cityName,
              fullName: data.display_name,
              lat: latitude,
              lng: longitude,
              state: data.address?.state || "",
              isCurrentLocation: true,
            };
            onLocationSelect(locationData);
            onClose();
          })
          .catch(() => {
            // If reverse geocoding fails, still use coordinates
            const locationData = {
              name: "Current Location",
              fullName: `${latitude}, ${longitude}`,
              lat: latitude,
              lng: longitude,
              state: "",
              isCurrentLocation: true,
            };
            onLocationSelect(locationData);
            onClose();
          })
          .finally(() => {
            setIsDetectingLocation(false);
          });
      },
      (error) => {
        setIsDetectingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Location access denied. Please enable location permissions."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out.");
            break;
          default:
            alert("An unknown error occurred while getting location.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    onLocationSelect(city);
    onClose();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      searchCities(query);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SmartModal
      open={open}
      onClose={onClose}
      header="Select Your Location"
      size="2xl"
      staticBackdrop={true}
    >
      <div className="space-y-6 pt-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your city..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-fern-500 transition-all duration-200 text-lg"
          />
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 uppercase">or</span>
          </div>
        </div>

        {/* Current Location Button */}
        <div className="text-center">
          <button
            onClick={detectCurrentLocation}
            disabled={isDetectingLocation}
            className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-fern-500 to-fern-600 hover:from-fern-600 hover:to-fern-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Navigation className="w-5 h-5 mr-3" />
            <span className="font-medium">
              {isDetectingLocation
                ? "Detecting Location..."
                : "Use My Current Location"}
            </span>
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              Search Results
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {searchResults.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left p-3 hover:bg-fern-50 hover:border-fern-300 rounded-lg border border-gray-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-600">{city.state}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            Popular Cities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPopularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city)}
                className="px-2 py-3 hover:bg-fern-50 hover:border-fern-300 rounded-lg border border-gray-300 group cursor-pointer flex space-x-2"
              >
                <div className="text-3xl">{city.icon}</div>
                <div className="text-left flex flex-col">
                  <div className="font-semibold text-sm">{city.name}</div>
                  <div className="text-xs text-gray-500">{city.state}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* No results message */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center text-gray-500 py-4">
            No cities found for "{searchQuery}"
          </div>
        )}

        {/* Loading state */}
        {isSearching && (
          <div className="text-center text-gray-500 py-4">Searching...</div>
        )}
      </div>
    </SmartModal>
  );
}
