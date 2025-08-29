import { Bot } from "lucide-react";

export default function AiThinkingLoader() {
  return (
    <div className="flex items-center gap-3 animate-in slide-in-from-left-4 duration-500">
      <div className="p-2 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
        <Bot className="w-6 h-6" />
      </div>

      <div className="">
        <div className="flex items-center gap-4">
          <div className="relative overflow-hidden">
            <span className="text-sm text-gray-500 relative z-10">
              Thinking
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-shimmer"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                animation: "shimmer 2s infinite",
                transform: "skewX(-12deg)",
                width: "200%",
                left: "-100%",
              }}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-razzmatazz-500 rounded-full animate-grow-dot-1"></div>
            <div className="w-2 h-2 bg-razzmatazz-500 rounded-full animate-grow-dot-2"></div>
            <div className="w-2 h-2 bg-razzmatazz-500 rounded-full animate-grow-dot-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
