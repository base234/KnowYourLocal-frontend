import React, { Fragment } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, TrendingUp, Users, Heart } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Locals', value: '12', icon: MapPin, color: 'text-fern-600', bg: 'bg-fern-100' },
    { name: 'This Month', value: '3', icon: TrendingUp, color: 'text-lochmara-600', bg: 'bg-lochmara-100' },
    { name: 'Followers', value: '248', icon: Users, color: 'text-razzmatazz-600', bg: 'bg-razzmatazz-100' },
    { name: 'Favourites', value: '67', icon: Heart, color: 'text-fern-600', bg: 'bg-fern-100' },
  ];

  const recentActivity = [
    { id: 1, action: 'Created new local', target: 'Coffee Corner Downtown', time: '2 hours ago', color: 'bg-fern-400' },
    { id: 2, action: 'Updated location', target: 'Pizza Palace', time: '5 hours ago', color: 'bg-lochmara-400' },
    { id: 3, action: 'Added to favourites', target: 'Central Park Bench', time: '1 day ago', color: 'bg-razzmatazz-400' },
    { id: 4, action: 'Shared local', target: 'Beach Volleyball Court', time: '2 days ago', color: 'bg-fern-400' },
  ];

  return (
    <Fragment>
      <h1 className="text-2xl font-bold text-gray-900">
        Hey {user?.first_name}
      </h1>

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${activity.color} mt-2 flex-shrink-0`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>{" "}
                      <span className="text-fern-600">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="text-sm text-fern-600 hover:text-fern-700 font-medium">
                View all activity →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left bg-fern-50 hover:bg-fern-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-fern-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">
                    Create New Local
                  </span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">
                    View Analytics
                  </span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">
                    Manage Favourites
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
