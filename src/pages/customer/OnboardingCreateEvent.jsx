import React, { useState, useEffect, Fragment } from "react";
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
    radius_km: 2,
    description: "",
    date: "",
    time: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    setSelectedUserType(userType);
    setFormData((prev) => ({
      ...prev,
      event_type: userType,
    }));
    setStep(2);
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
              <p className="text-3xl">Mark your nearby location to discover and explore</p>
            </div>
            <div className="mt-8 mb-12">
              <GoogleMap
                onLocationSelect={handleLocationSelect}
                initialRadius={formData.radius_km}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
