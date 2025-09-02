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

    Api.get("/locals/stream-text")
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
      <h1 className="text-2xl font-bold text-gray-900">Research</h1>

      <div className="mt-6 max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <h3 className="px-2 py-1 font-semibold flex items-center justify-between">
            <span>Data</span>
            <button
              onClick={fireFirecrawl}
              className="pl-2 pr-3 py-2 bg-fern-50 hover:bg-fern-100 rounded-lg transition-colors duration-200 text-sm text-fern-600 hover:text-fern-700 font-medium flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4" /> <span>Stream Research</span>
            </button>
          </h3>
        </div>
        {isLoading && (
          <div className="px-3 py-4">
            <LoaderCircle className="w-4 h-4 animate-spin" />
          </div>
        )}

        {!isLoading && <div className="p-4">{firecrawlContent?.markdown}</div>}
      </div>

      <div className="mt-6 max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <h3 className="px-2 py-1 font-semibold flex items-center justify-between">
            <span>Data</span>
            <button
              onClick={generateData}
              className="pl-2 pr-3 py-2 bg-fern-50 hover:bg-fern-100 rounded-lg transition-colors duration-200 text-sm text-fern-600 hover:text-fern-700 font-medium flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4" /> <span>Regenerate Now</span>
            </button>
          </h3>
        </div>
        {isLoading && (
          <div className="px-3 py-4">
            <LoaderCircle className="w-4 h-4 animate-spin" />
          </div>
        )}

        {!isLoading && <div className="p-4">{firecrawlContent?.markdown}</div>}
      </div>
    </Fragment>
  );
}
