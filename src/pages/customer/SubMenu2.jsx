import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export default function SubMenu2() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sub Menu 2</h1>
        <p className="mt-1 text-gray-600">Analytics and reporting dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-fern-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-fern-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Usage Analytics</h3>
              <p className="text-gray-600">Track how your locals are performing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-lochmara-100 rounded-lg">
              <PieChart className="w-6 h-6 text-lochmara-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
              <p className="text-gray-600">View distribution by categories</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-razzmatazz-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-razzmatazz-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Growth Trends</h3>
              <p className="text-gray-600">Monitor growth and engagement</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports & Analytics</h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
          <p className="text-gray-600">
            We're working on comprehensive analytics and reporting features to help you understand your local performance better.
          </p>
        </div>
      </div>
    </div>
  );
}
