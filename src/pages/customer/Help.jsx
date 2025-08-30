import React, { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Mail, Phone, Book, Video, FileText } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', label: 'Getting Started', icon: Book },
    { id: 'locals', label: 'Managing Locals', icon: FileText },
    { id: 'account', label: 'Account & Settings', icon: MessageCircle },
    { id: 'technical', label: 'Technical Issues', icon: Video },
  ];

  const faqItems = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first local?',
      answer: 'To create your first local, click the "New Local" button in the sidebar, fill in the details about your location, and save it. You can add photos, descriptions, and tags to make it more discoverable.',
    },
    {
      id: 2,
      category: 'locals',
      question: 'Can I edit or delete my locals?',
      answer: 'Yes! You can edit or delete your locals anytime. Go to "My Locals", find the local you want to modify, and use the options menu to edit or delete it.',
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I change my profile settings?',
      answer: 'Click on your profile icon in the top-right corner, select "Settings" from the dropdown menu, and you can update your personal information, preferences, and privacy settings.',
    },
    {
      id: 4,
      category: 'technical',
      question: 'The app is running slowly, what should I do?',
      answer: 'Try refreshing the page first. If the issue persists, clear your browser cache, check your internet connection, or try using a different browser. Contact support if problems continue.',
    },
    {
      id: 5,
      category: 'locals',
      question: 'How do I make my locals discoverable by others?',
      answer: 'Make sure to add detailed descriptions, relevant tags, and high-quality photos to your locals. Set appropriate privacy settings and consider sharing them on social media.',
    },
    {
      id: 6,
      category: 'getting-started',
      question: 'What are the different types of locals I can create?',
      answer: 'You can create various types of locals including restaurants, parks, shops, entertainment venues, work spaces, and any other location that might be interesting or useful to others.',
    },
  ];

  const contactOptions = [
    {
      id: 1,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      action: 'Start Chat',
      available: true,
    },
    {
      id: 2,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      icon: Mail,
      action: 'Send Email',
      available: true,
    },
    {
      id: 3,
      title: 'Phone Support',
      description: 'Call our support line for urgent issues',
      icon: Phone,
      action: 'Call Now',
      available: false,
    },
  ];

  const filteredFAQs = selectedCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="mt-2 text-gray-600">Find answers to your questions or get in touch with our support team</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fern-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-3 bg-fern-100 rounded-lg">
                    <Icon className="w-6 h-6 text-fern-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    <button
                      className={`mt-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        option.available
                          ? 'bg-fern-500 hover:bg-fern-600 text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!option.available}
                    >
                      {option.action}
                      {!option.available && ' (Coming Soon)'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'border-fern-500 bg-fern-50 text-fern-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-1">
            {selectedCategory === 'all'
              ? `Showing all ${filteredFAQs.length} questions`
              : `Showing ${filteredFAQs.length} questions in ${categories.find(c => c.id === selectedCategory)?.label}`
            }
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {categories.find(c => c.id === faq.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-gradient-to-r from-fern-50 to-lochmara-50 rounded-lg p-8 text-center">
        <HelpCircle className="w-12 h-12 text-fern-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help you.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-fern-500 hover:bg-fern-600 text-white rounded-lg transition-colors duration-200">
            Contact Support
          </button>
          <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
