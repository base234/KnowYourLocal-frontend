import React from 'react';
import { Settings, Users, Bell } from 'lucide-react';

export default function SubMenu1() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sub Menu 1</h1>
        <p className="mt-1 text-gray-600">This is a placeholder page for Sub Menu 1</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-fern-100 rounded-lg">
              <Settings className="w-6 h-6 text-fern-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
              <p className="text-gray-600">Manage your settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-lochmara-100 rounded-lg">
              <Users className="w-6 h-6 text-lochmara-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
              <p className="text-gray-600">Manage team members and permissions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-razzmatazz-100 rounded-lg">
              <Bell className="w-6 h-6 text-razzmatazz-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-gray-600">Configure notification preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600">
          This section is under development. More features and functionality will be added soon.
        </p>
      </div>
    </div>
  );
}
