import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lochmara-50 via-white to-fern-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-lochmara-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-fern-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-razzmatazz-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/register"
            className="text-gray-600 hover:text-gray-800 mb-6 inline-block"
          >
            ← Back to Registration
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Introduction</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              At KnowYourLocal, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              location-based discovery platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Information We Collect</h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Name, email address, and contact information</li>
                  <li>• Location data and preferences for personalized recommendations</li>
                  <li>• Communication preferences and account settings</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Usage Information</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Search queries and discovery patterns</li>
                  <li>• App usage statistics and feature interactions</li>
                  <li>• Device information and technical specifications</li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">How We Use Your Information</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Service Delivery</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Provide personalized location recommendations</li>
                  <li>• Enable location-based search and discovery</li>
                  <li>• Improve app functionality and user experience</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Communication</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Send important service updates</li>
                  <li>• Provide customer support</li>
                  <li>• Share relevant offers and promotions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Data Security</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• End-to-end encryption for sensitive data transmission</li>
                <li>• Secure authentication through Descope</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited access controls for our team members</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Privacy Rights</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Access & Control</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• View and update your personal information</li>
                  <li>• Download your data in a portable format</li>
                  <li>• Delete your account and associated data</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Communication</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Opt-out of marketing communications</li>
                  <li>• Control location sharing preferences</li>
                  <li>• Manage notification settings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Email:</strong> privacy@knowyourlocal.com</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              This Privacy Policy is effective as of {new Date().toLocaleDateString()} and will be updated as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
