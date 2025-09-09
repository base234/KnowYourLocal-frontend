import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
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
            <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Agreement to Terms</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              By accessing and using KnowYourLocal's location discovery platform, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          {/* Service Description */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Our Service</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                KnowYourLocal provides a location-based discovery platform that helps you find and explore places around you.
                Our service includes:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Location-based search and recommendations</li>
                <li>• Personalized discovery of local businesses and attractions</li>
                <li>• Community-driven content and reviews</li>
                <li>• Integration with mapping and navigation services</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">User Responsibilities</h2>

            <div className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">What You Can Do</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Use the service for personal, non-commercial purposes</li>
                  <li>• Share accurate and helpful information</li>
                  <li>• Respect other users and their privacy</li>
                  <li>• Report inappropriate content or behavior</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">What You Cannot Do</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Share false, misleading, or harmful content</li>
                  <li>• Attempt to hack or compromise our systems</li>
                  <li>• Use the service for commercial purposes without permission</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Account Terms */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Account Terms</h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Account Creation</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• You must provide accurate and complete information</li>
                  <li>• You are responsible for maintaining account security</li>
                  <li>• One person may not maintain multiple accounts</li>
                  <li>• You must be at least 13 years old to create an account</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Account Termination</h3>
                <div className="text-sm text-gray-700">
                  <p>We reserve the right to suspend or terminate accounts that violate these terms.
                  You may also delete your account at any time through your account settings.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Privacy and Data</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Your privacy is important to us. Our collection and use of your information is governed by our
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-800 font-semibold"> Privacy Policy</Link>.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• We collect location data to provide personalized recommendations</li>
                <li>• Your data is protected using industry-standard security measures</li>
                <li>• You can control your privacy settings and data sharing preferences</li>
                <li>• We do not sell your personal information to third parties</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Limitation of Liability</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                KnowYourLocal provides its service "as is" without warranties of any kind. We are not liable for any
                damages arising from your use of our service, including but not limited to indirect, incidental,
                or consequential damages.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Changes to These Terms</h2>
            <div className="space-y-4">
              <div className="text-sm text-gray-700">
                <p>We may update these Terms of Service from time to time. We will notify you of any material
                changes by posting the new terms on this page and updating the "Last updated" date.
                Your continued use of our service after such changes constitutes acceptance of the new terms.</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Email:</strong> legal@knowyourlocal.com</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              These Terms of Service are effective as of {new Date().toLocaleDateString()} and govern your use of our service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
