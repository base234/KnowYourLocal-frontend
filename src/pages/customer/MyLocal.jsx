import React, { Fragment, useEffect, useState } from "react";
import { MapPin, Calendar, Heart, Share2, MoreVertical } from "lucide-react";
import Api from "@/api/api";
import { Link, useParams } from "react-router";
import RightSidebar from "@/components/RightSidebar";

export default function MyLocals() {
  const { local_id } = useParams();

  const [local, setLocal] = useState([]);

  useEffect(() => {
    fetchLocal();
  }, []);

  const fetchLocal = () => {
    Api.get(`/locals/${local_id}`)
      .then((response) => {
        setLocal(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <h1 className="text-2xl font-bold">{local.name}</h1>

      {local.length === 0 && (
        <div className="w-full p-4 border border-gray-200">
          Create your first local
        </div>
      )}

      {local.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {local.map((local) => (
            <Link
              key={local.id}
              to={`/locals/${local.id}`}
              className="px-6 pt-4 pb-6 bg-white border border-gray-200 shadow-xs rounded-lg group"
            >
              <h3 className="font-semibold text-lochmara-600 hover:text-lochmara-700 group-hover:underline underline-offset-4 decoration-lochmara-500 decoration-dashed cursor-pointer">
                {local.name}
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                {local.co_ordinates.lat}, {local.co_ordinates.lng} - radius{" "}
                {local.radius} km
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Right Sidebar */}
      <RightSidebar />
    </Fragment>
  );
}
