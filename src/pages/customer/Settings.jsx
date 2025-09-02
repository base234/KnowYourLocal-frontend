import React, { Fragment, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MapPin, TrendingUp, Users, Heart, Flame, LoaderCircle } from "lucide-react";
import Api from "@/api/api";

export default function Firecrawl() {
  const [firecrawlContent, setFirecrawlContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");

  const fireFirecrawl = () => {
    setIsLoading(true);
    const payload = {
      data: {
        url: "https://firecrawl.dev",
      },
    };

    Api.post("/locals/firecrawl", payload)
      .then((response) => {
        setFirecrawlContent(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const generateData = () => {
    setIsLoading(true);

    Api.get("/locals/generate-data")
      .then((response) => {
        setFirecrawlContent(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const stats = [
    {
      name: "Total Locals",
      value: "12",
      icon: MapPin,
      color: "text-fern-600",
      bg: "bg-fern-100",
    },
    {
      name: "This Month",
      value: "3",
      icon: TrendingUp,
      color: "text-lochmara-600",
      bg: "bg-lochmara-100",
    },
    {
      name: "Followers",
      value: "248",
      icon: Users,
      color: "text-razzmatazz-600",
      bg: "bg-razzmatazz-100",
    },
    {
      name: "Favourites",
      value: "67",
      icon: Heart,
      color: "text-fern-600",
      bg: "bg-fern-100",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Created new local",
      target: "Coffee Corner Downtown",
      time: "2 hours ago",
      color: "bg-fern-400",
    },
    {
      id: 2,
      action: "Updated location",
      target: "Pizza Palace",
      time: "5 hours ago",
      color: "bg-lochmara-400",
    },
    {
      id: 3,
      action: "Added to favourites",
      target: "Central Park Bench",
      time: "1 day ago",
      color: "bg-razzmatazz-400",
    },
    {
      id: 4,
      action: "Shared local",
      target: "Beach Volleyball Court",
      time: "2 days ago",
      color: "bg-fern-400",
    },
  ];

  return (
    <Fragment>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="mt-6 max-w-7xl flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <h3 className="p-2 font-semibold">Profile</h3>
          </div>
          <div className="p-6">
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-7xl flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <h3 className="p-2 font-semibold">Personal Information</h3>
          </div>
          <div className="p-6">
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-7xl flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <h3 className="p-2 font-semibold">Other Settings</h3>
          </div>
          <div className="p-6">
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-7xl flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <h3 className="p-2 font-semibold">Toggle</h3>
          </div>
          <div className="p-6">
          </div>
        </div>
      </div>
    </Fragment>
  );
}
