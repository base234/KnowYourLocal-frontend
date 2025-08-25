import React from "react";
import { MessageCircle } from "lucide-react";

const GreetingCard = ({ greetingData }) => {
  if (!greetingData) return null;

  const { greeting } = greetingData;

  if (!greeting) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-red-600" />
          <span className="text-red-800">Invalid greeting data received</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-3 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-5 h-5 text-green-600" />
        <span className="font-bold text-green-800 text-lg">Greeting Message</span>
      </div>

      <div className="text-center">
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <p className="text-3xl font-bold text-green-700 mb-2">
            {greeting}
          </p>
          <div className="text-sm text-green-600">
            ✨ Greeting function executed successfully
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
