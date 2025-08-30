import React, { useState, useEffect, Fragment } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import GoogleMap from "@/components/GoogleMap";

export default function NewLocal() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    local_name: "",
    location: "",
    location_coordinates: null,
    search_location: null,
    radius_km: 2,
    description: "",
    local_type_id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [step, setStep] = useState(1);
  const [localTypes, setLocalTypes] = useState([]);
  const [isLocalTypesLoading, setIsLocalTypesLoading] = useState(true);
  const [localTypesError, setLocalTypesError] = useState("");
  const [localData, setLocalData] = useState({});

  const navigate = useNavigate();

  // Fetch local types from API
  useEffect(() => {
    fetchLocalTypes();
  }, []);

  const fetchLocalTypes = () => {
    setIsLocalTypesLoading(true);
    setLocalTypesError("");

    Api.get("/local-types")
      .then((response) => {
        setLocalTypes(response.data.data);
        setIsLocalTypesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching local types:", error);
        setLocalTypesError(
          "Failed to load local types. Please refresh the page."
        );
        setIsLocalTypesLoading(false);
      });
  };

  // Show loading while fetching local types
  if (!user || isLocalTypesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fern-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleUserTypeSelect = (userType) => {
    // Reset all form data when user type changes
    setSelectedUserType(userType);

    // Find the selected user type to get the id for API calls
    const selectedType = localTypes.find((type) => type.id === userType);

    setFormData({
      local_name: "",
      location: "",
      location_coordinates: null,
      search_location: null,
      radius_km: 2,
      description: "",
      local_type_id: selectedType?.id || null,
    });
    setStep(2);
  };

  const handleLocationSelect = (locationData) => {
    console.log("Location selected:", locationData);
    setFormData((prev) => ({
      ...prev,
      location: locationData.address,
      location_coordinates: locationData.coordinates,
      search_location: locationData.searchLocation || null,
      radius_km: locationData.radius,
    }));
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
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setError("");

    if (!formData.local_name.trim()) {
      setError("Local name is required");
      return;
    }

    if (!formData.location_coordinates) {
      setError("Please select a location");
      return;
    }

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
        local_type_id: formData.local_type_id,
        local_name: formData.local_name.trim(),
        description: formData.description.trim(),
        co_ordinates: formData.location_coordinates,
        location_search_query: formData.search_location,
        radius: formData.radius_km,
      },
    };

    await Api.post("/locals", payload)
      .then((response) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          startVelocity: 80,
          gravity: 0.8,
          ticks: 200,
        });

        setLocalData(response.data.data);
        setStep(5);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while creating your local. Please try again."
        );
        setIsLoading(false);
      });
  };

  const handleGoToLocal = () => {
    if (localData.id) {
      navigate(`/locals/${localData.id}`);
    }
  };

  const handleGoToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        {/* User Type Selection */}
        {step === 1 && (
          <Fragment>
            <h1 className="font-bold text-4xl tracking-tight">
              Let's create a new local
            </h1>
            <p className="mt-3 text-3xl">Choose the type of local you want to create</p>

            {/* Error Display for User Types */}
            {localTypesError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{localTypesError}</p>
              </div>
            )}

            <div className="mt-8 mb-12">
              {isLocalTypesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fern-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading local types...</p>
                </div>
              ) : localTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {localTypes.map((localType) => (
                    <button
                      key={localType.id}
                      onClick={() => handleUserTypeSelect(localType.id)}
                      className={`h-full p-6 text-left border border-gray-300 hover:bg-lochmara-50 hover:border-lochmara-300 rounded-xl shadow-xs hover:shadow cursor-pointer flex flex-col group`}
                    >
                      <div className="mb-8 flex flex-1 flex-col">
                        <div className="text-4xl mb-4 ">{localType.icon}</div>
                        <h3 className="text-xl font-semibold group-hover:text-lochmara-600">
                          {localType.name}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed flex-grow text-gray-500 group-hover:text-gray-700">
                          {localType.short_description}
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No local types available. Please refresh the page.
                  </p>
                </div>
              )}
            </div>
          </Fragment>
        )}

        {step === 2 && (
          <Fragment>
            <p className="mt-3 text-3xl">
              Tell us about your new local
            </p>

            <div className="mt-8 mb-12 flex items-start gap-10">
              {/* Left Side - Selected Event Details */}
              <div className="w-1/2 space-y-4">
                <h2 className="text-4xl">
                  {localTypes.find((type) => type.id === formData.local_type_id)
                    ?.icon || "🎯"}
                </h2>
                <h2 className="text-2xl font-semibold capitalize">
                  {localTypes.find((type) => type.id === formData.local_type_id)
                    ?.name || "Local Type"}
                </h2>
                <p className="max-w-lg text-sm text-gray-500 leading-relaxed">
                  {localTypes.find((type) => type.id === formData.local_type_id)
                    ?.description || ""}
                </p>
              </div>

              {/* Right Side - Event Form */}
              <div className="w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Name */}
                  <div>
                    <label
                      htmlFor="local_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Local Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="local_name"
                      name="local_name"
                      value={formData.local_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your local name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Local Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your local..."
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
                      onClick={() => {
                        setStep(3);
                      }}
                      disabled={!formData.local_name.trim()}
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
            <p className="mt-3 text-3xl">
              Mark your nearby location to discover and explore
            </p>
            <div className="mt-8 mb-12">
              {!formData.location_coordinates ? (
                // When no location is selected, show event details on left and location selection on right
                <div className="flex items-start gap-10">
                  {/* Left Side - Event Details */}
                  <div className="w-1/2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {localTypes.find(
                          (type) => type.id === formData.local_type_id
                        )?.icon || "🎯"}
                        &nbsp;&nbsp;
                        {localTypes.find(
                          (type) => type.id === formData.local_type_id
                        )?.name || "Local Type"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {formData.local_name}
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
                      localTypes.find(
                        (type) => type.id === formData.local_type_id
                      )?.icon || "🎯",
                    type:
                      localTypes.find(
                        (type) => type.id === formData.local_type_id
                      )?.name || "Local Type",
                    name: formData.local_name,
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

            <p className="mt-3 text-3xl">
              Review & create your new local
            </p>
            <div className="mt-8 mb-12 flex gap-10">
              <div className="w-1/2">
                {/* Map Section */}
                <div className="h-96 rounded-lg overflow-hidden">
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
                <h3 className="font-medium mb-4">Local Details</h3>
                <div className="space-y-4">
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Name:</p>
                    <p className="text-gray-700">{formData.local_name}</p>
                  </div>
                  <div className="text-sm flex justify-between">
                    <p className="text-gray-500">Type:</p>
                    <p className="text-gray-700">
                      {localTypes.find(
                        (type) => type.id === formData.local_type_id
                      )?.icon || "🎯"}
                      &nbsp;&nbsp;
                      {localTypes.find(
                        (type) => type.id === formData.local_type_id
                      )?.name || "Local Type"}
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
                    <span>Creating Local...</span>
                  </div>
                ) : (
                  <span>Create Local</span>
                )}
              </button>
            </div>
          </Fragment>
        )}

        {step === 5 && (
          <Fragment>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                  <div className="text-4xl mb-6">🎉</div>

                  <h1 className="text-xl md:text-3xl font-bold">
                    Congratulations{" "}
                    <span className="bg-gradient-to-r from-fern-600 to-lochmara-600 bg-clip-text text-transparent">
                      {user?.first_name}!
                    </span>
                  </h1>

                  <p className="mt-2 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    You've successfully created another amazing local for your community.
                  </p>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="p-0.5 border border-fern-200 rounded-xl h-full">
                    <div className="bg-gradient-to-br from-white to-fern-100 px-2 py-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <div className="text-3xl mb-3">✨</div>
                      <h3 className="font-semibold text-fern-800 mb-2">
                        Created New Local
                      </h3>
                      <p className="text-sm text-fern-600">
                        Another unique space for your community
                      </p>
                    </div>
                  </div>

                  <div className="p-0.5 border border-lochmara-200 rounded-xl h-full">
                    <div className="bg-gradient-to-br from-white to-lochmara-100 px-2 py-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <div className="text-3xl mb-3">📍</div>
                      <h3 className="font-semibold text-lochmara-800 mb-2">
                        Set New Location
                      </h3>
                      <p className="text-sm text-lochmara-600">
                        Marked another perfect spot for connections
                      </p>
                    </div>
                  </div>

                  <div className="p-0.5 border border-razzmatazz-200 rounded-xl h-full">
                    <div className="bg-gradient-to-br from-white to-razzmatazz-100 px-2 py-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-semibold text-razzmatazz-800 mb-2">
                        Expanded Your Reach
                      </h3>
                      <p className="text-sm text-razzmatazz-600">
                        Growing your local community presence
                      </p>
                    </div>
                  </div>

                  <div className="p-0.5 border border-gray-200 rounded-xl h-full">
                    <div className="bg-gradient-to-br from-white to-gray-100 px-2 py-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <div className="text-3xl mb-3">🌟</div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Building Connections
                      </h3>
                      <p className="text-sm text-gray-600">
                        Creating more opportunities for meaningful interactions
                      </p>
                    </div>
                  </div>
                </div>

                {/* What's Next Section */}
                <div className="p-0.5 border border-gray-200 rounded-xl">
                  <div className="bg-gradient-to-r from-gray-50 to-white py-6 px-8 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-800 mb-6">
                      What Would You Like to Do Next?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-fern-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            Manage Your New Local
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Go directly to your newly created local to start managing it
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-lochmara-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            Return to Dashboard
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Go back to your main dashboard to see all your locals
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="mt-10 text-center space-y-4">
                  <button
                    onClick={handleGoToLocal}
                    className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-fern-500 to-lochmara-500 hover:from-fern-600 hover:to-lochmara-600 rounded-lg shadow hover:shadow-lg cursor-pointer mr-4"
                  >
                    Go to Local
                  </button>
                  <button
                    onClick={handleGoToHome}
                    className="px-6 py-3 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow hover:shadow-lg cursor-pointer"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
