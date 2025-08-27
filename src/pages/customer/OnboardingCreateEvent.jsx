import React, { useState, useEffect, Fragment } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";
import GoogleMap from "@/components/GoogleMap";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function OnboardingCreateEvent() {
  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    location: "",
    location_coordinates: null,
    search_location: null, // Add search location field
    radius_km: 2,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSmartModal, setShowSmartModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [step, setStep] = useState(1);

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
    // Reset all form data when user type changes
    setSelectedUserType(userType);
    setFormData({
      event_name: "",
      event_type: userType,
      location: "",
      location_coordinates: null,
      search_location: null,
      radius_km: 2,
      description: "",
    });
    setStep(2);
  };

  const handleLocationSelect = (locationData) => {
    console.log("Location selected:", locationData);
    setFormData((prev) => ({
      ...prev,
      location: locationData.address,
      location_coordinates: locationData.coordinates,
      search_location: locationData.searchLocation || null, // Capture search location if available
      radius_km: locationData.radius,
    }));
    setShowSmartModal(false);
  };

  const handleLocationLoadingChange = (loading) => {
    setIsLocationLoading(loading);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // If called from form submission, prevent default
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setError("");

    // Validate required fields
    if (!formData.event_name.trim()) {
      setError("Event name is required");
      return;
    }

    if (!formData.location_coordinates) {
      setError("Please select a location");
      return;
    }

    // Validate coordinates
    if (
      typeof formData.location_coordinates.lat !== "number" ||
      typeof formData.location_coordinates.lng !== "number"
    ) {
      setError("Invalid location coordinates");
      return;
    }

    if (
      formData.location_coordinates.lat < -90 ||
      formData.location_coordinates.lat > 90
    ) {
      setError("Invalid latitude value");
      return;
    }

    if (
      formData.location_coordinates.lng < -180 ||
      formData.location_coordinates.lng > 180
    ) {
      setError("Invalid longitude value");
      return;
    }

    // Validate radius
    if (
      typeof formData.radius_km !== "number" ||
      formData.radius_km < 1 ||
      formData.radius_km > 25
    ) {
      setError("Invalid radius value");
      return;
    }

    setIsLoading(true);

    const payload = {
      data: {
        event_name: formData.event_name.trim(),
        event_type: formData.event_type.trim(),
        location: formData.location.trim(),
        location_coordinates: formData.location_coordinates,
        search_location: formData.search_location,
        radius_km: formData.radius_km,
        description: formData.description.trim(),
      },
    };

    await Api.post("/events", payload)
      .then((response) => {
        markEventAsCreated();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 1.1 },
          startVelocity: 80,
        });
        // navigate("/dashboard");
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while creating your event. Please try again."
        );
        setIsLoading(false);
      });
  };

  const userTypes = [
    {
      id: "event_planner",
      title: "Event Planner",
      description:
        "Event planner, looking for venues, supporting ecosystems, and neighborhood dynamics.",
      icon: "🎯",
    },
    {
      id: "newcomer",
      title: "Newcomer",
      description:
        "New at city, looking for hotels, places to stay, know your local shops and more.",
      icon: "🆕",
    },
    {
      id: "tourist",
      title: "Tourist",
      description: "Easy navigation + Authentic Experiences = Sounds Cool",
      icon: "🧳",
    },
    {
      icon: "🏠",
      id: "local",
      title: "Local",
      description:
        "Discover hidden gems + know your neighbourhood + local updates",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <h1 className="font-bold text-4xl tracking-tight">
          Hello {user?.first_name}
        </h1>

        {/* User Type Selection */}
        {step === 1 && (
          <Fragment>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl">Let's create your first local</p>
            </div>
            <div className="mt-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {userTypes.map((userType) => (
                  <button
                    key={userType.id}
                    onClick={() => handleUserTypeSelect(userType.id)}
                    className={`h-full p-6 text-left border border-gray-300 hover:bg-lochmara-50 hover:border-lochmara-300 rounded-xl shadow-xs hover:shadow cursor-pointer flex flex-col group`}
                  >
                    <div className="mb-8 flex flex-1 flex-col">
                      <div className="text-4xl mb-4 ">{userType.icon}</div>
                      <h3 className="text-xl font-semibold group-hover:text-lochmara-600">
                        {userType.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed flex-grow text-gray-500 group-hover:text-gray-700">
                        {userType.description}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-sm text-gray-400 invisible group-hover:visible">
                        Click to select
                      </p>
                      <div className="p-2 text-sm group-hover:bg-lochmara-200 rounded-full flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-lochmara-600" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Fragment>
        )}

        {step === 2 && (
          <Fragment>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl">Tell us about your event</p>
            </div>

            <div className="mt-8 mb-12 flex items-start gap-10">
              {/* Left Side - Selected Event Details */}
              <div className="w-1/2 space-y-4">
                <h2 className="text-4xl">
                  {userTypes.find((type) => type.id === formData.event_type)
                    ?.icon || "🎯"}
                </h2>
                <h2 className="text-2xl font-semibold capitalize">
                  {formData.event_type.replace("_", " ")}
                </h2>
                <p className="text-sm text-gray-700">
                  {userTypes.find((type) => type.id === formData.event_type)
                    ?.description || ""}
                </p>
              </div>

              {/* Right Side - Event Form */}
              <div className="w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Name */}
                  <div>
                    <label
                      htmlFor="event_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Event Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="event_name"
                      name="event_name"
                      value={formData.event_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your event name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your event..."
                    />
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3 py-2 font-semibold text-sm text-gray-500 hover:text-gray-600 hover:underline underline-offset-4 decoration-gray-400 decoration-dashed cursor-pointer flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.event_name.trim()}
                      className="pl-4 pr-3 py-2 font-semibold text-sm text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Fragment>
        )}

        {step === 3 && (
          <Fragment>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl">
                Mark your nearby location to discover and explore
              </p>
            </div>
            <div className="mt-8 mb-12">
              {!formData.location_coordinates ? (
                // When no location is selected, show event details on left and location selection on right
                <div className="flex items-start gap-10">
                  {/* Left Side - Event Details */}
                  <div className="w-1/2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 capitalize">
                        {userTypes.find(
                          (type) => type.id === formData.event_type
                        )?.icon || "🎯"}
                        &nbsp;&nbsp;
                        {formData.event_type.replace("_", " ")}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {formData.event_name}
                      </span>
                    </div>
                    {formData.description && (
                      <p className="max-w-lg mt-8 text-sm text-gray-500 leading-relaxed">
                        {formData.description}
                      </p>
                    )}
                  </div>

                  {/* Right Side - Location Selection */}
                  <div className="w-1/2">
                    <GoogleMap
                      onLocationSelect={handleLocationSelect}
                      initialRadius={formData.radius_km}
                      initialLocation={formData.location_coordinates}
                      readOnly={false}
                      onLoadingChange={handleLocationLoadingChange}
                    />
                  </div>
                </div>
              ) : (
                // When location is selected, show map with event details above radius slider
                <GoogleMap
                  onLocationSelect={handleLocationSelect}
                  initialRadius={formData.radius_km}
                  initialLocation={formData.location_coordinates}
                  readOnly={false}
                  eventDetails={{
                    icon:
                      userTypes.find((type) => type.id === formData.event_type)
                        ?.icon || "🎯",
                    type: formData.event_type.replace("_", " "),
                    name: formData.event_name,
                    description: formData.description,
                  }}
                  onLoadingChange={handleLocationLoadingChange}
                />
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-2 py-3 font-semibold text-sm text-gray-500 hover:text-gray-600 hover:underline underline-offset-4 decoration-gray-400 decoration-dashed cursor-pointer flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!formData.location_coordinates || isLocationLoading}
                className="pl-4 pr-3 py-2 font-semibold text-sm text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Fragment>
        )}

        {step === 4 && (
          <Fragment>
            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl">Review & Create Your Event</p>
            </div>

            <div className="mt-8 mb-12 flex gap-10">
              <div className="w-1/2">
                {/* Map Section */}
                <div className="h-96 rounded-lg overflow-hidden">
                  {console.log(
                    "Step 4 - Location coordinates:",
                    formData.location_coordinates
                  )}
                  <GoogleMap
                    key={`map-${formData.location_coordinates?.lat}-${formData.location_coordinates?.lng}`}
                    onLocationSelect={handleLocationSelect}
                    initialRadius={formData.radius_km}
                    initialLocation={formData.location_coordinates}
                    zoom={14}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="font-medium mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Name:</p>
                    <p className="text-gray-700">{formData.event_name}</p>
                  </div>
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Type:</p>
                    <p className="text-gray-700 capitalize">
                      {formData.event_type.replace("_", " ")}
                    </p>
                  </div>
                  {formData.description && (
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-500">Description:</p>
                      <p className="text-gray-700 max-w-sm text-right">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                <hr className="my-4 border-dashed border-gray-200" />

                <h3 className="font-medium mb-4">Location Details</h3>
                <div className="space-y-4">
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Address:</p>
                    <p className="text-gray-700">{formData.location}</p>
                  </div>
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Coordinates:</p>
                    <p>
                      <span className="text-gray-700">
                        {formData.location_coordinates.lat.toFixed(6)},{" "}
                        {formData.location_coordinates.lng.toFixed(6)}
                      </span>
                    </p>
                  </div>
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Search Query:</p>
                    <p>
                      <span className="text-gray-700">
                        {formData.search_location || "Current location (GPS)"}
                      </span>
                    </p>
                  </div>
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Radius:</p>
                    <p className="text-gray-700">{formData.radius_km} km</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-2 py-3 font-semibold text-sm text-gray-500 hover:text-gray-600 hover:underline underline-offset-4 decoration-gray-400 decoration-dashed cursor-pointer flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>back</span>
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="pl-4 pr-3 py-2 font-semibold text-sm text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <span>Creating Event...</span>
                  </div>
                ) : (
                  <span>Create Event</span>
                )}
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
