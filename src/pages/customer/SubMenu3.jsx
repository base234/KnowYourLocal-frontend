import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';

export default function SubMenu3() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sub Menu 3</h1>
        <p className="mt-1 text-gray-600">Advanced features and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-fern-100 rounded-lg">
              <Zap className="w-6 h-6 text-fern-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">API Integration</h3>
              <p className="text-gray-600">Connect with external services</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-lochmara-100 rounded-lg">
              <Shield className="w-6 h-6 text-lochmara-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="text-gray-600">Manage privacy and security</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-razzmatazz-100 rounded-lg">
              <Globe className="w-6 h-6 text-razzmatazz-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Global Settings</h3>
              <p className="text-gray-600">Configure global preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Features</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-fern-100 rounded-lg">
              <Zap className="w-5 h-5 text-fern-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Automation Rules</h3>
              <p className="text-sm text-gray-600">Set up automated workflows and triggers for your locals management.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-lochmara-100 rounded-lg">
              <Shield className="w-5 h-5 text-lochmara-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Advanced Privacy Controls</h3>
              <p className="text-sm text-gray-600">Fine-tune who can see and interact with your locals.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-razzmatazz-100 rounded-lg">
              <Globe className="w-5 h-5 text-razzmatazz-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Multi-language Support</h3>
              <p className="text-sm text-gray-600">Create locals in multiple languages to reach a broader audience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
