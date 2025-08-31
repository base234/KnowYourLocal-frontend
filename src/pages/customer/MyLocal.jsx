import React, { Fragment, useEffect, useState } from "react";
import { MapPin, Calendar, Heart, Share2, MoreVertical } from "lucide-react";
import Api from "@/api/api";
import { Link, useParams } from "react-router";
import RightSidebar from "@/components/RightSidebar";
import Loader from "@/components/Loader";

export default function MyLocals() {
  const { local_id } = useParams();

  const [local, setLocal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLocal();
  }, []);

  const fetchLocal = () => {
    setIsLoading(true);
    Api.get(`/locals/${local_id}`)
      .then((response) => {
        setLocal(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="mt-6">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <Fragment>
          <h1 className="text-2xl font-bold">{local.name}</h1>
          <div className="mt-6 max-w-7xl">
            <div className="my-6">
              <h2 className="text-lg font-semibold">Places Added</h2>
              <p className="text-sm text-gray-500">
                Details about the local places
              </p>

              {local?.local_type?.name === "Event & Occassions" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Caterers
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.8
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">
                        Delightful Bites Catering
                      </span>
                      <br />
                      Exquisite menus for every occasion.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://delightfulbites.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+919678956473"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 9678956473
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Cuisine
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.6
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">La Bella Italia</span>
                      <br />
                      Authentic Italian cuisine with a modern twist.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://labellaitalia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+917890675864"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 7890675864
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Venue
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.9
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Grand Event Hall</span>
                      <br />
                      Spacious, elegant, and fully equipped for all events.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://grandeventhall.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+917895647689"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 7895647689
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {local?.local_type?.name === "New to City" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Starbucks Card */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Starbucks
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.7
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Starbucks Coffee</span>
                      <br />
                      International coffeehouse chain known for its signature
                      roasts, pastries, and snacks.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://www.starbucks.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+18007827282"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 7654784326
                      </a>
                    </div>
                  </div>

                  {/* Blue Bottle Coffee */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Blue Bottle Coffee
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.6
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Blue Bottle Coffee</span>
                      <br />
                      Artisanal coffee shop serving single-origin brews and
                      fresh pastries in a minimalist setting.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://bluebottlecoffee.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+14155550123"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 8954637287
                      </a>
                    </div>
                  </div>

                  {/* The Daily Grind */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        The Daily Grind
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.5
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">The Daily Grind</span>
                      <br />
                      Cozy neighborhood café with specialty coffees, teas, and
                      homemade snacks.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://dailygrindcafe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+917890654783"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 7890654783
                      </a>
                    </div>
                  </div>

                  {/* Café Aroma */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Café Aroma
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.4
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Café Aroma</span>
                      <br />
                      European-style café with a wide selection of coffees,
                      pastries, and light snacks.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://cafearoma.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+918654782367"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 8654782367
                      </a>
                    </div>
                  </div>

                  {/* Java Junction */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Java Junction
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.3
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Java Junction</span>
                      <br />
                      Friendly spot for espresso drinks, smoothies, and fresh
                      bakery treats.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://javajunction.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+917890654783"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 7890654783
                      </a>
                    </div>
                  </div>

                  {/* Snack Shack */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Snack Shack
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.2
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Snack Shack</span>
                      <br />
                      Quick bites, sandwiches, and fresh juices in a casual,
                      vibrant atmosphere.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://snackshack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+919854782367"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 9854782367
                      </a>
                    </div>
                  </div>

                  {/* Café Delight */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-lochmara-600 mr-2">
                        Café Delight
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        4.1
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Café Delight</span>
                      <br />
                      Bright and airy cafeteria with a variety of snacks,
                      desserts, and specialty coffees.
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href="https://cafedelight.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lochmara-600 hover:underline flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Website
                      </a>
                      <a
                        href="tel:+918186547823"
                        className="text-razzmatazz-600 hover:underline flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> +91 8186547823
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-10 border-dashed border-gray-400" />

            <div className="my-6">
              <h2 className="text-lg font-semibold">
                Reasearch Places and Details
              </h2>
              <p className="text-sm text-gray-500">
                Detailed info with facts about the places for best decisions
              </p>

              {local?.local_type?.name === "Event & Occassions" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        Grand Event Hall
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>Capacity: Up to 500 guests</li>
                        <li>Modern sound & lighting system</li>
                        <li>Ample parking space</li>
                        <li>Highly rated for service (4.9/5)</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span> The
                      Grand Event Hall is praised for its elegant interiors and
                      flexibility for both traditional and modern ceremonies.
                      Reviews highlight the helpful staff and seamless event
                      coordination.
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        La Bella Italia
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>Specializes in Italian cuisine</li>
                        <li>Customizable wedding packages</li>
                        <li>Excellent hygiene standards</li>
                        <li>Vegetarian & non-vegetarian options</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span> Royal
                      Caterers are known for their innovative dishes and
                      presentation. Couples recommend their tasting sessions and
                      appreciate their flexibility in accommodating dietary
                      preferences.
                    </div>
                  </div>
                </div>
              )}

              {local?.local_type?.name === "New to City" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        Starbucks
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>
                          Global coffeehouse chain with over 30,000 locations
                        </li>
                        <li>
                          Signature drinks: Pumpkin Spice Latte, Frappuccino
                        </li>
                        <li>Free Wi-Fi and comfortable seating</li>
                        <li>Rewards program for frequent customers</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span>{" "}
                      Starbucks is popular for its consistent quality, friendly
                      baristas, and convenient locations. Many newcomers find it
                      a reliable spot for work or casual meetings.
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        Blue Bottle Coffee
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>
                          Specializes in single-origin, freshly roasted beans
                        </li>
                        <li>Minimalist, modern café design</li>
                        <li>Known for pour-over and cold brew methods</li>
                        <li>Focus on sustainability and direct trade</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span> Blue
                      Bottle is praised for its artisanal approach and
                      high-quality coffee. Locals recommend their New
                      Orleans-style iced coffee and pastries.
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        The Daily Grind
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>Neighborhood café with cozy atmosphere</li>
                        <li>
                          Offers specialty coffees, teas, and homemade snacks
                        </li>
                        <li>Pet-friendly outdoor seating</li>
                        <li>Hosts open mic and community events</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span> The
                      Daily Grind is a favorite for its welcoming vibe and
                      community focus. Many newcomers appreciate the friendly
                      staff and local art displays.
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg text-lochmara-700">
                        Java Junction
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <ul className="list-disc ml-5">
                        <li>Locally owned, independent coffee shop</li>
                        <li>Known for creative seasonal drinks</li>
                        <li>Offers vegan and gluten-free pastries</li>
                        <li>Quiet study nooks and book exchange shelf</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Research Note:</span> Java
                      Junction is highly rated for its unique drink menu and
                      relaxing environment. New residents often mention it as a
                      great spot to meet locals and unwind.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}

      {/* Right Sidebar */}
      <RightSidebar local={local} />
    </Fragment>
  );
}
