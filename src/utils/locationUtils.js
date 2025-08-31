// Location utilities for managing user location data

const LOCATION_STORAGE_KEY = 'user_location';

// Save location to localStorage
export const saveLocation = (locationData) => {
  try {
    const locationToSave = {
      name: locationData.name,
      fullName: locationData.fullName,
      lat: locationData.lat,
      lng: locationData.lng,
      state: locationData.state,
      isCurrentLocation: locationData.isCurrentLocation || false,
      timestamp: Date.now()
    };
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationToSave));
    return true;
  } catch (error) {
    console.error('Error saving location to localStorage:', error);
    return false;
  }
};

// Get location from localStorage
export const getLocation = () => {
  try {
    const locationData = localStorage.getItem(LOCATION_STORAGE_KEY);
    return locationData ? JSON.parse(locationData) : null;
  } catch (error) {
    console.error('Error reading location from localStorage:', error);
    return null;
  }
};

// Check if location exists
export const hasLocation = () => {
  return getLocation() !== null;
};

// Remove location from localStorage
export const removeLocation = () => {
  try {
    localStorage.removeItem(LOCATION_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error removing location from localStorage:', error);
    return false;
  }
};

// Get coordinates string for API calls
export const getCoordinatesString = () => {
  const location = getLocation();
  if (location && location.lat && location.lng) {
    return `${location.lat},${location.lng}`;
  }
  return null;
};

// Get formatted location display name
export const getLocationDisplayName = () => {
  const location = getLocation();
  if (location) {
    if (location.state) {
      return `${location.name}, ${location.state}`;
    }
    return location.name;
  }
  return null;
};

// Validate location data
export const isValidLocation = (locationData) => {
  return locationData && 
         typeof locationData.lat === 'number' && 
         typeof locationData.lng === 'number' &&
         !isNaN(locationData.lat) && 
         !isNaN(locationData.lng) &&
         locationData.lat >= -90 && locationData.lat <= 90 &&
         locationData.lng >= -180 && locationData.lng <= 180;
};

// Get distance between two coordinates in kilometers
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
