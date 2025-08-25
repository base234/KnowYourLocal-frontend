import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";
import SmartModal from "@/components/SmartModal";
import GoogleMap from "@/components/GoogleMap";
import { ArrowRight } from "lucide-react";

export default function OnboardingCreateEvent() {
  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    location: "",
    location_coordinates: null,
    radius_km: 14,
    description: "",
    date: "",
    time: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSmartModal, setShowSmartModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");

  const { user, markEventAsCreated } = useAuth();
  const navigate = useNavigate();

  // Prevent access if user already has an event created or doesn't have customer role
  useEffect(() => {
    if (user) {
      if (user.is_event_created === 1 || user.role !== "customer") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // Show loading while checking user status
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fern-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if user already has an event or doesn't have customer role
  if (user.is_event_created === 1 || user.role !== "customer") {
    return null; // This will trigger the useEffect redirect
  }

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    setFormData((prev) => ({
      ...prev,
      event_type: userType,
    }));
    setShowSmartModal(true);
  };

  const handleLocationSelect = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      location: locationData.address,
      location_coordinates: locationData.coordinates,
      radius_km: locationData.radius,
    }));
    setShowSmartModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        data: {
          event_name: formData.event_name.trim(),
          event_type: formData.event_type.trim(),
          location: formData.location.trim(),
          location_coordinates: formData.location_coordinates,
          radius_km: formData.radius_km,
          description: formData.description.trim(),
          date: formData.date,
          time: formData.time,
        },
      };

      await Api.post("/events", payload);

      // Mark event as created in auth context
      markEventAsCreated();

      // Redirect to dashboard - user can no longer access this page
      navigate("/dashboard");
    } catch (error) {
      console.error("Create event error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while creating your event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    {
      id: "event_planner",
      title: "Event Planner",
      description:
        "Needs venues + Supporting ecosystems use rich data to understand neighborhood dynamics and venue stability.",
      icon: "🎯",
    },
    {
      id: "newcomer",
      title: "Newcomer",
      description:
        "Needs practical info + local integration tips like restrooms, hotels, paying guests and places to stay, also to know local shops, what they sell and home delivery is available or not, includes phone numbers and all.",
      icon: "🆕",
    },
    {
      id: "tourist",
      title: "Tourist",
      description: "Wants authentic experiences + easy navigation.",
      icon: "🧳",
    },
    {
      icon: "🏠",
      id: "local",
      title: "Local",
      description: "Wants hidden gems + neighborhood updates.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <h1 className="font-semibold text-4xl">
          Hey {user?.first_name}
        </h1>
        <p className="mt-4 text-4xl font-semibold">Let's create your first local</p>

        {/* User Type Selection */}
        <div className="mt-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {userTypes.map((userType) => (
              <button
                key={userType.id}
                onClick={() => handleUserTypeSelect(userType.id)}
                className={`h-full p-6 text-left border border-gray-300 hover:border-fern-300 rounded-xl shadow-xs hover:shadow cursor-pointer flex flex-col group`}
              >
                <div className="mb-10 flex flex-1 flex-col">
                  <div className="text-4xl mb-4 ">{userType.icon}</div>
                  <h3 className="text-xl font-semibold group-hover:text-green-700">
                    {userType.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed flex-grow text-gray-500 group-hover:text-gray-700">
                    {userType.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <button className="text-sm rounded-md flex items-center gap-2">
                    <span>Click to select</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Event Creation Form - Only show after location is selected */}
        {formData.location_coordinates && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Create Your Event
              </h2>
              <p className="text-gray-600">
                Set up your first event to get started
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div>
                <label
                  htmlFor="event_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Name
                </label>
                <input
                  id="event_name"
                  name="event_name"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-fern-500 focus:border-fern-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your event name"
                  value={formData.event_name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="event_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Type
                </label>
                <input
                  id="event_type"
                  name="event_type"
                  type="text"
                  required
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 sm:text-sm"
                  value={
                    userTypes.find((ut) => ut.id === formData.event_type)
                      ?.title || formData.event_type
                  }
                />
              </div>

              {/* Event Type Description */}
              {formData.event_type && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    {
                      userTypes.find((ut) => ut.id === formData.event_type)
                        ?.title
                    }
                  </h4>
                  <p className="text-sm text-blue-700">
                    {
                      userTypes.find((ut) => ut.id === formData.event_type)
                        ?.description
                    }
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    readOnly
                    className="flex-1 appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-fern-500 focus:border-fern-500 focus:z-10 sm:text-sm bg-gray-50"
                    placeholder="Select location using the map"
                    value={formData.location}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLocationModal(true)}
                    className="px-4 py-2 border border-fern-300 text-fern-700 bg-white rounded-md hover:bg-fern-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 sm:text-sm"
                  >
                    Change Location
                  </button>
                </div>
                {formData.location_coordinates && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">📍 Selected Location:</span>{" "}
                      {formData.location}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      <span className="font-medium">Radius:</span>{" "}
                      {formData.radius_km} km
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fern-500 focus:border-fern-500 sm:text-sm"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fern-500 focus:border-fern-500 sm:text-sm"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fern-500 focus:border-fern-500 sm:text-sm"
                  placeholder="Tell us about your event..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fern-600 hover:bg-fern-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Smart Modal for Location Selection */}
        <SmartModal
          open={showSmartModal}
          header={`Select Location for ${
            userTypes.find((ut) => ut.id === selectedUserType)?.title ||
            "Your Event"
          }`}
          size="2xl"
          centered={true}
          onClose={() => setShowSmartModal(false)}
        >
          <GoogleMap />
        </SmartModal>

        {/* Location Selection Modal */}
        {showLocationModal && (
          <LocationModal
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
            onLocationSelect={(locationData) => {
              setFormData((prev) => ({
                ...prev,
                location: locationData.address,
                location_coordinates: locationData.coordinates,
                radius_km: locationData.radius,
              }));
              setShowLocationModal(false);
            }}
            initialRadius={formData.radius_km}
          />
        )}
      </div>
    </div>
  );
}
