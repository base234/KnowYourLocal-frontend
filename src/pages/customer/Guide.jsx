import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, ArrowRight, MapPin, Heart, Search, Settings } from 'lucide-react';

export default function Guide() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Foursquare',
      description: 'Learn the basics of creating and managing your locals',
      duration: '5 min',
      steps: 6,
      icon: MapPin,
      color: 'bg-fern-100 text-fern-600',
    },
    {
      id: 2,
      title: 'Creating Your First Local',
      description: 'Step-by-step guide to create and customize your local',
      duration: '3 min',
      steps: 4,
      icon: Play,
      color: 'bg-lochmara-100 text-lochmara-600',
    },
    {
      id: 3,
      title: 'Discovering New Places',
      description: 'How to use Quick Find to discover amazing locals',
      duration: '4 min',
      steps: 5,
      icon: Search,
      color: 'bg-razzmatazz-100 text-razzmatazz-600',
    },
    {
      id: 4,
      title: 'Managing Favourites',
      description: 'Organize and manage your favourite locals',
      duration: '2 min',
      steps: 3,
      icon: Heart,
      color: 'bg-fern-100 text-fern-600',
    },
  ];

  const detailedSteps = [
    {
      id: 1,
      title: 'Welcome to Foursquare',
      description: 'Foursquare helps you discover and share amazing local places. Let\'s get you started!',
      content: 'In this guide, you\'ll learn how to navigate the interface, create your first local, and start discovering places around you.',
      action: 'Continue',
    },
    {
      id: 2,
      title: 'Navigate the Sidebar',
      description: 'The sidebar is your main navigation tool. You can expand/collapse it and access all features.',
      content: 'Click the menu icon to toggle the sidebar. When collapsed, hover over icons to see tooltips. The sidebar contains Dashboard, My Locals, Quick Find, and more.',
      action: 'Got it',
    },
    {
      id: 3,
      title: 'Create Your First Local',
      description: 'Click the "New Local" button to create your first local place.',
      content: 'The New Local button is prominently displayed in the sidebar. Click it to open the creation modal where you can add details, photos, and descriptions.',
      action: 'Try it now',
    },
    {
      id: 4,
      title: 'Explore Quick Find',
      description: 'Use Quick Find to discover new places and locals around you.',
      content: 'Quick Find helps you search for specific types of places, filter by categories, and find highly-rated locals near your location.',
      action: 'Explore',
    },
    {
      id: 5,
      title: 'Manage Your Favourites',
      description: 'Save interesting locals to your favourites for easy access later.',
      content: 'Click the heart icon on any local to add it to your favourites. Access all your saved places from the Favourites section.',
      action: 'Understand',
    },
    {
      id: 6,
      title: 'You\'re All Set!',
      description: 'Congratulations! You now know the basics of using Foursquare.',
      content: 'Start exploring, creating locals, and discovering amazing places around you. Check out the Help section if you need more assistance.',
      action: 'Start Exploring',
    },
  ];

  const markStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const nextStep = () => {
    markStepComplete(activeStep);
    if (activeStep < detailedSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Quick Guide</h1>
        <p className="mt-2 text-gray-600">Learn how to make the most of Foursquare</p>
      </div>

      {/* Guide Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div key={guide.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className={`w-12 h-12 ${guide.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{guide.duration} read</span>
                <span>{guide.steps} steps</span>
              </div>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200">
                Start Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Tutorial */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Interactive Tutorial</h2>
            <span className="text-sm text-gray-500">
              Step {activeStep + 1} of {detailedSteps.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {detailedSteps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      completedSteps.includes(index)
                        ? 'bg-fern-500 text-white'
                        : index === activeStep
                        ? 'bg-fern-100 text-fern-600 border-2 border-fern-500'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < detailedSteps.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        completedSteps.includes(index) ? 'bg-fern-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {detailedSteps[activeStep].title}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {detailedSteps[activeStep].description}
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-600 leading-relaxed">
                {detailedSteps[activeStep].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  activeStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200"
              >
                {detailedSteps[activeStep].action}
                {activeStep < detailedSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-fern-100 rounded-lg">
              <MapPin className="w-5 h-5 text-fern-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Add Rich Descriptions</h3>
              <p className="text-sm text-gray-600">Include detailed descriptions and photos to make your locals more discoverable and useful.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-lochmara-100 rounded-lg">
              <Search className="w-5 h-5 text-lochmara-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Use Search Filters</h3>
              <p className="text-sm text-gray-600">Narrow down your search results using category filters and distance preferences.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-razzmatazz-100 rounded-lg">
              <Heart className="w-5 h-5 text-razzmatazz-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Organize Favourites</h3>
              <p className="text-sm text-gray-600">Save interesting places to your favourites and organize them by categories.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-fern-100 rounded-lg">
              <Settings className="w-5 h-5 text-fern-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Customize Settings</h3>
              <p className="text-sm text-gray-600">Adjust your preferences and privacy settings to personalize your experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Need More Help */}
      <div className="bg-gradient-to-r from-fern-50 to-lochmara-50 rounded-lg p-8 text-center">
        <BookOpen className="w-12 h-12 text-fern-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Need more detailed help?</h3>
        <p className="text-gray-600 mb-6">
          Check out our comprehensive help center or contact our support team.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200">
            Visit Help Center
          </button>
          <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
