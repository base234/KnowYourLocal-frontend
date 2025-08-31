import React, { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, Filter, Clock, Compass, Pill, Pizza, BriefcaseBusiness, Bike, GraduationCap, Navigation, ToggleLeft, ToggleRight } from 'lucide-react';
import Api from '../../api/api.jsx';
import PhotoCarousel from '../../components/PhotoCarousel.jsx';
import LocationSelector from '../../components/LocationSelector.jsx';
import { saveLocation, getLocation, hasLocation, getCoordinatesString, getLocationDisplayName } from '../../utils/locationUtils.js';

export default function QuickFind() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [apiCategories, setApiCategories] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordsLL, setCoordsLL] = useState(null);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [useApiCategories, setUseApiCategories] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  // Remove the artificial delay and trigger initial search when location is ready
  useEffect(() => {
    if (userLocation && coordsLL && !isLocationLoading) {
      handleCategoryClick("all");
    }
  }, [userLocation, coordsLL, isLocationLoading]);

  // Helper to find fsq ids from fallback set only
  const getFsqIdsForFilter = (filterId) => {
    const match = fallbackFilters.find((f) => f.id === filterId);
    if (match && match.fsq_category_ids) return match.fsq_category_ids;
    // If not in fallback, assume the filterId itself is an fsq_category_id (from API categories)
    if (filterId && filterId !== 'all') return filterId;
    return undefined;
  };

  // Fallback categories (used if API fails or geolocation unavailable)
  const fallbackFilters = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'food', label: 'Food & Drink', icon: Pizza, fsq_category_ids: "56aa371be4b08b9a8d573550,63be6904847c3692a84b9b46,63be6904847c3692a84b9b47,4bf58dd8d48988d120951735,56aa371be4b08b9a8d57350b,4bf58dd8d48988d1cb941735,52e81612bcbc57f1066b7a00,4bf58dd8d48988d16e941735,4bf58dd8d48988d1ce941735,4bf58dd8d48988d14f941735,53e0feef498e5aac066fd8a9,4bf58dd8d48988d1f9941735,5370f356bcbc57f1066c94c2,4bf58dd8d48988d11d951735,4bf58dd8d48988d117951735,4bf58dd8d48988d11e951735,52f2ab2ebcbc57f1066b8b31,5e18993feee47d000759b256,58daa1558bbb0b01f18ec1ca,4bf58dd8d48988d1fa941735,4bf58dd8d48988d10e951735,52f2ab2ebcbc57f1066b8b1c,4bf58dd8d48988d1f5941735,4bf58dd8d48988d118951735,52f2ab2ebcbc57f1066b8b45,50aa9e744b90af0d42d5de0e,52f2ab2ebcbc57f1066b8b2c,5f2c41945b4c177b9a6dc7d6,63be6904847c3692a84b9bef,58daa1558bbb0b01f18ec1e8,4bf58dd8d48988d186941735,63be6904847c3692a84b9bf0,56aa371be4b08b9a8d573564,52f2ab2ebcbc57f1066b8b46,58daa1558bbb0b01f18ec1e5,4bf58dd8d48988d119951735,4bf58dd8d48988d1ef931735" },
    { id: 'Outdoor', label: 'Outdoor', icon: Bike, fsq_category_ids: "52e81612bcbc57f1066b79ed,56aa371be4b08b9a8d57356a,63be6904847c3692a84b9b7f,4d4b7105d754a06377d81259,52e81612bcbc57f1066b7a28,56aa371be4b08b9a8d573544,4bf58dd8d48988d1e2941735,56aa371be4b08b9a8d57355e,5fabfc8099ce226e27fe6b0d,52e81612bcbc57f1066b7a22,4bf58dd8d48988d1df941735,4bf58dd8d48988d1e4941735,56aa371be4b08b9a8d573562,56aa371be4b08b9a8d57353b,50aaa49e4b90af0d42d5de11,56aa371be4b08b9a8d573511,5fac018b99ce226e27fe7573,52e81612bcbc57f1066b7a12,4bf58dd8d48988d15b941735,4bf58dd8d48988d15f941735,52e81612bcbc57f1066b7a23,56aa371be4b08b9a8d573547,4bf58dd8d48988d15a941735,4bf58dd8d48988d1e0941735,4bf58dd8d48988d159941735,5bae9231bedf3950379f89cd,4deefb944765f83613cdba6e,4bf58dd8d48988d160941735,50aaa4314b90af0d42d5de10,4bf58dd8d48988d161941735,4bf58dd8d48988d15d941735,5642206c498e4bfca532186c,4bf58dd8d48988d12d941735,4eb1d4d54b900d56c88a45fc,55a5a1ebe4b013909087cb77,52e81612bcbc57f1066b7a13,52e81612bcbc57f1066b7a30,4bf58dd8d48988d162941735,52e81612bcbc57f1066b7a14,4bf58dd8d48988d163941735,4bf58dd8d48988d1e5941735,52e81612bcbc57f1066b7a21,63be6904847c3692a84b9be0,5fabfe3599ce226e27fe709a,4bf58dd8d48988d1e7941735,5bae9231bedf3950379f89d0,63be6904847c3692a84b9be1,52e81612bcbc57f1066b7a25,5fac010d99ce226e27fe7467,4bf58dd8d48988d164941735,56aa371be4b08b9a8d573541,4eb1d4dd4b900d56c88a45fd,50328a4b91d4c4b30a586d6b,4bf58dd8d48988d133951735,4bf58dd8d48988d165941735,4bf58dd8d48988d166941735,4eb1baf03b7b2c5b1d4306ca,530e33ccbcbc57f1066bbfe4,50aa9e094b90af0d42d5de0d,530e33ccbcbc57f1066bbff7,5345731ebcbc57f1066c39b2,4f2a25ac4b909258e854f55f,530e33ccbcbc57f1066bbff8,530e33ccbcbc57f1066bbff3,530e33ccbcbc57f1066bbff9,4bf58dd8d48988d130941735,4bf58dd8d48988d1e3941735,52e81612bcbc57f1066b7a24,52f2ab2ebcbc57f1066b8b4a,5032848691d4c4b30a586d61,56aa371be4b08b9a8d573560,56aa371be4b08b9a8d5734c3,4fbc1be21983fc883593e321,5bae9231bedf3950379f89c7,52f2ab2ebcbc57f1066b8b22,58daa1558bbb0b01f18ec203" },
    { id: 'Travel', label: 'Travel', icon: MapPin, fsq_category_ids: "4d4b7105d754a06379d81259,5744ccdfe4b0c0459246b4e8,4e4c9077bd41f78e849722f9,5744ccdfe4b0c0459246b4c1,4bf58dd8d48988d12d951735,52f2ab2ebcbc57f1066b8b4b,52f2ab2ebcbc57f1066b8b50,55077a22498e5e9248869ba2,5032872391d4c4b30a586d64,4bf58dd8d48988d113951735,4bf58dd8d48988d1f6931735,63be6904847c3692a84b9c24,63be6904847c3692a84b9c25,4bf58dd8d48988d1f8931735,4f4530a74b9074f6e4fb0100,63be6904847c3692a84b9c26,4bf58dd8d48988d1ee931735,4bf58dd8d48988d1fa931735,4bf58dd8d48988d132951735,5bae9231bedf3950379f89cb,63be6904847c3692a84b9c27,4bf58dd8d48988d1fb931735,4bf58dd8d48988d12f951735,56aa371be4b08b9a8d5734e1,4f2a23984b9023bd5841ed2c,4c38df4de52ce0d596b336e1,4e74f6cabd41c4836eac4c31,4f4531504b9074f6e4fb0102,56aa371be4b08b9a8d57353e,52f2ab2ebcbc57f1066b8b53,4d954b16a243a5684b65b473,4bf58dd8d48988d1f9931735,52f2ab2ebcbc57f1066b8b4c,52f2ab2ebcbc57f1066b8b52,52f2ab2ebcbc57f1066b8b4d,52f2ab2ebcbc57f1066b8b4e,4f4530164b9074f6e4fb00ff,56aa371be4b08b9a8d573520,4bf58dd8d48988d12a951735,63be6904847c3692a84b9c28,4bf58dd8d48988d1ed931735,5f2c42335b4c177b9a6dc927,4bf58dd8d48988d1ef931735,4bf58dd8d48988d1f0931735,4eb1bc533b7b2c5b1d4306cb,56aa371be4b08b9a8d57352f,4bf58dd8d48988d1eb931735,60a674555c7917283bad6839,4bf58dd8d48988d1ec931735,5744ccdfe4b0c0459246b4e5,63be6904847c3692a84b9c29,4bf58dd8d48988d1f7931735,63be6904847c3692a84b9c2a,4bf58dd8d48988d1fe931735,52f2ab2ebcbc57f1066b8b4f,56aa371ce4b08b9a8d57356e,4bf58dd8d48988d1fc931735,5f2c1af1b6d05514c704319d,4bf58dd8d48988d1fd931735,4bf58dd8d48988d129951735,4bf58dd8d48988d1ef941735,53fca564498e1a175f32528b,52f2ab2ebcbc57f1066b8b51,54541b70498ea6ccd0204bff,63be6904847c3692a84b9c2b,63be6904847c3692a84b9c2c,63be6904847c3692a84b9c2d,4bf58dd8d48988d12b951735,4bf58dd8d48988d130951735,4f04b08c2fb6e1c99f3db0bd,4f04b25d2fb6e1c99f3db0c0,57558b36e4b065ecebd306dd" },
    { id: 'work', label: 'Work', icon: BriefcaseBusiness, fsq_category_ids: "52f2ab2ebcbc57f1066b8b3f,4bf58dd8d48988d124941735,63be6904847c3692a84b9b32,5032764e91d4c4b30a586d5a,5665ef1d498ec706735f0e59,54f4ba06498e2cf5561da814,5665c7b9498e7d8a4f2c0f06,63be6904847c3692a84b9b75,4bf58dd8d48988d174941735,4bf58dd8d48988d127941735,63be6904847c3692a84b9b76,4bf58dd8d48988d125941735,63be6904847c3692a84b9b86,63be6904847c3692a84b9ba4,4bf58dd8d48988d172941735,4bf58dd8d48988d177941735,4bf58dd8d48988d121951735,4bf58dd8d48988d174941735,56aa371be4b08b9a8d5734d3,52f2ab2ebcbc57f1066b8b3a" },
    { id: 'education', label: 'Education', icon: GraduationCap, fsq_category_ids: "4bf58dd8d48988d13b941735,56aa371ce4b08b9a8d573570,63be6904847c3692a84b9b9f,52e81612bcbc57f1066b7a43,4d4b7105d754a06372d81259,4bf58dd8d48988d198941735,4bf58dd8d48988d197941735,4bf58dd8d48988d199941735,4bf58dd8d48988d1af941735,4bf58dd8d48988d1bb941735,4bf58dd8d48988d1ba941735,4bf58dd8d48988d1b1941735,4bf58dd8d48988d1a1941735,4bf58dd8d48988d1a0941735,4bf58dd8d48988d19a941735,4bf58dd8d48988d1b9941735,4bf58dd8d48988d19e941735,4bf58dd8d48988d1b8941735,4bf58dd8d48988d1b2941735,4bf58dd8d48988d19d941735,4bf58dd8d48988d1b5941735,4bf58dd8d48988d1a5941735,4bf58dd8d48988d1a7941735,4bf58dd8d48988d19c941735,4bf58dd8d48988d1aa941735,4bf58dd8d48988d1a9941735,4bf58dd8d48988d1a3941735,4bf58dd8d48988d19b941735,4bf58dd8d48988d1b7941735,4bf58dd8d48988d1b4941735,4bf58dd8d48988d19f941735,4e39a9cebd410d7aed40cbc4,4bf58dd8d48988d1ac941735,4bf58dd8d48988d1b6941735,4bf58dd8d48988d1a2941735,4bf58dd8d48988d1b0941735,4bf58dd8d48988d1a8941735,4bf58dd8d48988d1a6941735,4bf58dd8d48988d1b3941735,4bf58dd8d48988d141941735,4bf58dd8d48988d1ab941735,4bf58dd8d48988d1ae941735,63be6904847c3692a84b9ba0,58daa1558bbb0b01f18ec200,52e81612bcbc57f1066b7a42,52e81612bcbc57f1066b7a49,52e81612bcbc57f1066b7a48,4f04b10d2fb6e1c99f3db0be,4f4533814b9074f6e4fb0107,52e81612bcbc57f1066b7a45,63be6904847c3692a84b9ba1,4f4533804b9074f6e4fb0105,4bf58dd8d48988d13d941735,4f4533814b9074f6e4fb0106,52e81612bcbc57f1066b7a46,52e81612bcbc57f1066b7a47,4bf58dd8d48988d1ad941735" },
    { id: 'health', label: 'Health', icon: Pill, fsq_category_ids: "54541900498ea6ccd0202697,63be6904847c3692a84b9b49,52e81612bcbc57f1066b7a27,52f2ab2ebcbc57f1066b8b20,52f2ab2ebcbc57f1066b8b1d,63be6904847c3692a84b9b4a,4bf58dd8d48988d110951735,52f2ab2ebcbc57f1066b8b3c,4f04aa0c2fb6e1c99f3db0b8,63be6904847c3692a84b9b4b,4bf58dd8d48988d1ed941735,4d1cf8421a97d635ce361c31,4bf58dd8d48988d1de931735,63be6904847c3692a84b9bb9,63be6904847c3692a84b9bba,52e81612bcbc57f1066b7a3b,52e81612bcbc57f1066b7a3c,63be6904847c3692a84b9bbb,5f2c43a65b4c177b9a6dcc62,52e81612bcbc57f1066b7a3a,4bf58dd8d48988d178941735,63be6904847c3692a84b9bbc,63be6904847c3692a84b9bbd,4bf58dd8d48988d194941735,63be6904847c3692a84b9bbe,63be6904847c3692a84b9bbf,5f2c5b8b5b4c177b9a6ddf0b,4bf58dd8d48988d196941735,63be6904847c3692a84b9bc0,58daa1558bbb0b01f18ec1f7,56aa371be4b08b9a8d5734ff,4bf58dd8d48988d104941735,4f4531b14b9074f6e4fb0103,63be6904847c3692a84b9bc1,52e81612bcbc57f1066b7a39,63be6904847c3692a84b9bc2,63be6904847c3692a84b9bc3,63be6904847c3692a84b9bc4,58daa1558bbb0b01f18ec1d0,522e32fae4b09b556e370f19,63be6904847c3692a84b9bc5,5744ccdfe4b0c0459246b4af,63be6904847c3692a84b9bc6,63be6904847c3692a84b9bc7,63be6904847c3692a84b9bc8,63be6904847c3692a84b9bc9,4bf58dd8d48988d177941735,63be6904847c3692a84b9bca,63be6904847c3692a84b9bcb,63be6904847c3692a84b9bcc,63be6904847c3692a84b9bcd,63be6904847c3692a84b9bce,63be6904847c3692a84b9bcf,63be6904847c3692a84b9bd0,63be6904847c3692a84b9bd1,63be6904847c3692a84b9bd2,63be6904847c3692a84b9bd3,63be6904847c3692a84b9bd4,63be6904847c3692a84b9bd5,63be6904847c3692a84b9bd6,63be6904847c3692a84b9bd7,63be6904847c3692a84b9bd8,63be6904847c3692a84b9bd9,63be6904847c3692a84b9bda,63be6904847c3692a84b9bdb,63be6904847c3692a84b9bdc,63be6904847c3692a84b9bdd,63be6904847c3692a84b9bde,56aa371be4b08b9a8d573526,4d954af4a243a5684765b473,590a0744340a5803fd8508c3,63be6904847c3692a84b9bdf,50aa9e744b90af0d42d5de0e" },
  ];

  // Check for existing location on component mount
  useEffect(() => {
    const savedLocation = getLocation();
    if (savedLocation) {
      setUserLocation(savedLocation);
      setCoordsLL(`${savedLocation.lat},${savedLocation.lng}`);
      setShowLocationSelector(false);
    } else {
      setShowLocationSelector(true);
    }
    // Use a small delay to prevent flash of loading state
    const timer = setTimeout(() => {
      setIsLocationLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch categories based on current location
  useEffect(() => {
    if (!coordsLL || !useApiCategories) return;

    const RESOLUTION = 120; // allowed: 32, 44, 64, 88, 120
    const RADIUS_METERS = 5000;

    const fetchCategories = (lat, lon) => {
      Api.get('/quick-find/location-categories', {
        params: { ll: `${lat},${lon}`, radius: RADIUS_METERS }
      })
        .then((response) => {
          const categories = response?.data?.data?.categories || [];
          const normalized = categories.map((c) => ({
            id: c.fsq_category_id || c.short_name || c.name,
            label: c.short_name || c.name,
            iconUrl:
              c?.icon?.prefix && c?.icon?.suffix
                ? `${c.icon.prefix}bg_${RESOLUTION}${c.icon.suffix}`
                : null,
          }));
          setApiCategories(normalized);
        })
        .catch((error) => {
          console.error('Failed to fetch location categories:', error);
          setApiCategories([]); // trigger fallback
        });
    };

    // Extract lat, lon from coordsLL string
    const [lat, lon] = coordsLL.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lon)) {
      setApiCategories([]);
      fetchCategories(lat, lon);
    }
  }, [coordsLL, useApiCategories]);

  // Tiles shown in UI: either API categories (+ All) or fallback set
  const categoryTiles = useMemo(() => {
    if (useApiCategories && Array.isArray(apiCategories) && apiCategories.length > 0) {
      return [
        { id: 'all', label: 'All', icon: Compass },
        ...apiCategories,
      ];
    }
    return fallbackFilters;
  }, [apiCategories, useApiCategories]);

  const quickSuggestions = [
    'Coffee shops near me',
    'Parks and recreation',
    'Study spaces',
    'Restaurants',
    'Shopping centers',
    'Gyms and fitness',
  ];

  const RADIUS_METERS = 50000;
  const api_data_limit = 50;

  // Handle location selection
  const handleLocationSelect = (locationData) => {
    setUserLocation(locationData);
    setCoordsLL(`${locationData.lat},${locationData.lng}`);
    saveLocation(locationData);
    setShowLocationSelector(false);
    setIsLocationLoading(false); // Ensure loading state is complete
  };

  const performSearch = (options = {}) => {
    // Check if user has selected a location
    if (isLocationLoading) {
      return; // Don't search while location is loading
    }
    if (!coordsLL) {
      setShowLocationSelector(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    const effectiveQuery = options.query !== undefined ? options.query : searchQuery;
    const effectiveFilterId = options.filterId !== undefined ? options.filterId : selectedFilter;
    const fsqIds = effectiveFilterId && effectiveFilterId !== 'all' ? getFsqIdsForFilter(effectiveFilterId) : undefined;

    const payload = {
      query: effectiveQuery && effectiveQuery.trim().length > 0 ? effectiveQuery.trim() : undefined,
      ll: coordsLL || '',
      radius: RADIUS_METERS,
      fsq_category_ids: fsqIds,
      limit: api_data_limit,
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    Api.post('/quick-find/search', payload)
      .then((response) => {
        const results = response?.data?.data?.search_results?.results || [];
        setSearchResults(results);
      })
      .catch((error) => {
        console.log('Quick Find search failed:', error);
        setError('Search failed. Please try again.');
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCategoryClick = (filterId) => {
    setSelectedFilter(filterId);
    // Check if user has location before searching
    if (isLocationLoading) {
      return; // Don't search while location is loading
    }
    if (!coordsLL) {
      setShowLocationSelector(true);
      return;
    }
    // Trigger search immediately on category click
    performSearch({ filterId });
  };

  const handleSearchClick = () => {
    performSearch();
  };

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quick Find</h1>
          <p className="mt-1 text-gray-600">
            Discover amazing locals around you
          </p>
        </div>

        {/* Location Display */}
        {!isLocationLoading && userLocation && (
          <button
            onClick={() => {
              if (!isLocationLoading && userLocation) {
                setShowLocationSelector(true);
              }
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200"
          >
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {getLocationDisplayName()}
            </span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px]">
        {isLocationLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fern-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Location...
            </h3>
            <p className="text-gray-600">
              Please wait while we load your saved location
            </p>
          </div>
        ) : !userLocation ? (
          <div className="text-center py-8">
            <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Location Required
            </h3>
            <p className="text-gray-600 mb-4">
              Please select your location to start discovering places around you
            </p>
            <button
              onClick={() => {
                if (!isLocationLoading) {
                  setShowLocationSelector(true);
                }
              }}
              className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200"
            >
              Select Location
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for locals, places, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    performSearch();
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>
            <button
              onClick={handleSearchClick}
              className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Search
            </button>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                performSearch({ query: suggestion });
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-fern-100 hover:text-fern-700 text-gray-600 text-sm rounded-full transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div> */}

      {/* Categories */}
      {!isLocationLoading && userLocation && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>

            {/* Toggle Button */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Relevance</span>
              <button
                onClick={() => setUseApiCategories(!useApiCategories)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-fern-500 focus:ring-offset-2 ${
                  useApiCategories ? "bg-fern-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                    useApiCategories ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {categoryTiles.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleCategoryClick(filter.id)}
                  className={`cursor-pointer flex items-center justify-center p-4 rounded-lg border-2 transition-colors duration-200 ${
                    selectedFilter === filter.id
                      ? "border-fern-500 bg-fern-50 text-fern-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className="text-center">
                    {filter.iconUrl ? (
                      <img
                        src={filter.iconUrl}
                        alt={filter.label}
                        className="w-6 h-6 mx-auto mb-2"
                      />
                    ) : (
                      Icon && <Icon className="w-6 h-6 mx-auto mb-2" />
                    )}
                    <span className="text-sm font-medium">{filter.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Status indicator */}
          {useApiCategories && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    Array.isArray(apiCategories) && apiCategories.length > 0
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <span className="text-sm text-blue-700">
                  {Array.isArray(apiCategories) && apiCategories.length > 0
                    ? `Showing ${apiCategories.length} location-specific categories`
                    : "Loading categories from your area..."}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Results */}
      {!isLocationLoading && userLocation && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Search Results
              </h3>
              <span className="text-sm text-gray-500">
                {searchResults.length} results found
              </span>
            </div>
          </div>

          {isLoading && (
            <div className="p-6 text-sm text-gray-500">Loading...</div>
          )}
          {error && !isLoading && (
            <div className="p-6 text-sm text-red-600">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="divide-y divide-gray-200">
              {searchResults.map((result) => {
                const primaryCategory =
                  Array.isArray(result.categories) &&
                  result.categories.length > 0
                    ? result.categories[0]?.name
                    : undefined;
                const distanceMeters =
                  typeof result.distance === "number"
                    ? result.distance
                    : undefined;
                const distanceKm =
                  distanceMeters !== undefined
                    ? `${(distanceMeters / 1000).toFixed(1)} km`
                    : "—";
                const address =
                  result?.location?.formatted_address ||
                  [result?.location?.address, result?.location?.locality]
                    .filter(Boolean)
                    .join(", ");
                const website = result?.website;
                return (
                  <div
                    key={result.fsq_place_id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex space-x-4">
                      <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <PhotoCarousel
                          fsqPlaceId={result.fsq_place_id}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {result.name}
                            </h4>
                            {address && (
                              <p className="text-gray-600 mt-1">{address}</p>
                            )}
                          </div>
                          <div className="flex items-center ml-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              <Clock className="w-3 h-3 mr-1" />
                              {distanceKm}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center mt-3 space-x-4">
                          {primaryCategory && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {primaryCategory}
                            </span>
                          )}
                          {website && (
                            <a
                              href={website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-fern-700 hover:underline truncate"
                            >
                              Visit website
                            </a>
                          )}
                        </div>

                        <div className="flex items-center mt-4 space-x-3">
                          <a
                            className="flex items-center px-4 py-2 bg-fern-500 hover:bg-fern-600 text-white text-sm rounded-lg transition-colors duration-200"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              result.name
                            )} ${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            Get Directions
                          </a>
                          {result.link && (
                            <a
                              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors duration-200"
                              href={result.placemaker_url || result.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View details
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {searchResults.length === 0 && (
                <div className="p-6 text-sm text-gray-500">
                  No results yet. Try a category or search.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Location Selector Modal */}
      <LocationSelector
        open={showLocationSelector && !isLocationLoading}
        onClose={() => setShowLocationSelector(false)}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
}
