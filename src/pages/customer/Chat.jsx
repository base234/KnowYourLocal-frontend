import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  ArrowUp,
  Loader2,
} from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import GreetingCard from "@/components/GreetingCard";
import Api from "@/api/api";
import "@/components/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventSource, setEventSource] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [inputRows, setInputRows] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setInputRows(1);

    setTimeout(() => {
      setIsLoading(true);
    }, 600);
    // setIsLoading(true);

    const payload = {
      data: {
        text: input,
      },
    };

    Api.post("/chats/stream-text", payload)
      .then((response) => {
        const apiData = response.data.data;
        const message = {
          role: apiData.ai_response.role,
          aiResponse: apiData.ai_response.content,
          totalToolsUsed: apiData.tools_used,
          conversations: apiData.conversations,
          toolCalls: apiData.tool_calls,
        };

        setMessages((prev) => [...prev, message]);
        setIsLoading(false);
      })
      .catch((error) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content = `❌ Error: ${
              response.data?.message || "Failed to get response"
            }`;
          }
        });
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Auto-resize textarea
    const rows = Math.min(Math.max(e.target.value.split("\n").length, 1), 4);
    setInputRows(rows);
  };

  const renderFunctionResult = (functionName, result) => {
    switch (functionName) {
      case "greet_hello_world":
        return <GreetingCard greetingData={result} />;

      case "get_pokemon_info":
        return (
          <div>
            <PokemonCard pokemonData={result} />;<p>Hello World</p>
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2 prose">
            <div className="text-sm">{JSON.stringify(result, null, 2)}</div>
          </div>
        );
    }
  };

  // Helper function to check if a message contains Pokemon tool call results
  const hasPokemonToolCall = (message) => {
    return message.functionResults?.some(
      (result) => result.function_name === "get_pokemon_info"
    );
  };

  // Helper function to format Pokemon response content
  const formatPokemonResponse = (content, hasToolCall) => {
    if (!hasToolCall) return content;

    // If there's a Pokemon tool call, format the response nicely
    return content.replace(
      /Pikachu is a well-known Pokémon/,
      "Here's what I found about Pikachu! 🎉"
    );
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "timeout":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected";
      case "error":
        return "Error";
      case "timeout":
        return "Timeout";
      default:
        return "Disconnected";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gray-800 text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Assistant
                </h1>
                <p className="text-sm text-gray-600">
                  Powered by advanced tool calling
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full border border-gray-200">
                <div
                  className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {getConnectionStatusText()}
                </span>
              </div>

              {eventSource && (
                <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {eventSource.readyState === EventSource.CONNECTING
                    ? "Connecting"
                    : eventSource.readyState === EventSource.OPEN
                    ? "Open"
                    : eventSource.readyState === EventSource.CLOSED
                    ? "Closed"
                    : "Unknown"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-44 messages-container">
        <div className="max-w-4xl mx-auto space-y-10">
          {messages.length === 0 && (
            <div className="text-center py-20 welcome-message">
              <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-full bg-gray-100">
                <Sparkles className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to your AI Assistant!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                I'm here to help you with various tasks. Ask me anything or try
                one of the example prompts above.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Ready to assist you</span>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <Fragment key={index}>
              {message.role === "user" && (
                <div className="text-sm flex justify-end items-start group animate-in fade-in-up duration-500">
                  <div className="bg-razzmatazz-500 text-white rounded-b-lg rounded-tl-lg px-4 py-2 max-w-xl group-hover:shadow-md message-bubble">
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>

                  <div className="flex-1 animate-in animate-in fade-in-up duration-200">
                    <div className="px-4 pt-0 pb-6 text-sm max-w-xl message-bubble">
                      <div className="prose prose-sm text-gray-600">
                        <div
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: message.aiResponse,
                          }}
                        ></div>
                      </div>

                      {message.conversations &&
                        message.conversations.length > 0 && (
                          <div className="mt-6 space-y-4">
                            {message.conversations.map(
                              (conversation, convIndex) => (
                                <Fragment key={convIndex}>
                                  {conversation.role === "assistant" && (
                                    <div className="prose prose-sm text-gray-600">
                                      {conversation.content}
                                    </div>
                                  )}
                                  {conversation.role === "tool" && (
                                    <div className="tool-result">
                                      {conversation.tool_name ===
                                        "get_pokemon_info" && (
                                        <PokemonCard
                                          data={conversation.content}
                                        />
                                      )}
                                      {conversation.tool_name ===
                                        "greet_hello_world" && (
                                        <GreetingCard
                                          data={conversation.content}
                                        />
                                      )}
                                    </div>
                                  )}
                                </Fragment>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 animate-in slide-in-from-left-4 duration-500">
              <div className="p-2 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>

              <div className="">
                <div className="flex items-center gap-4">
                  <div className="relative overflow-hidden">
                    <span className="text-sm text-gray-500 relative z-10">
                      AI is thinking
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
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 lg:px-0 z-10">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            className="w-full text-sm border-2 border-gray-200 rounded-2xl px-6 py-4 pr-16 resize-none focus:outline-none focus:border-razzmatazz-400 focus:ring-2 focus:ring-razzmatazz-100 text-gray-800 placeholder-gray-400 input-field bg-white/90 backdrop-blur-sm shadow-lg"
            rows={inputRows}
            disabled={isLoading}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 rounded-xl bg-razzmatazz-600 text-white hover:bg-razzmatazz-700 disabled:bg-gray-300 disabled:cursor-not-allowed send-button"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowUp className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
