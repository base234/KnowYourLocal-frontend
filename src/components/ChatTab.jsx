import React, { useState, useRef, useEffect, Fragment } from "react";
import { Bot, Sparkles, ArrowUp, Loader2 } from "lucide-react";
import PokemonCard from "@/components/tools/PokemonCard";
import GreetingCard from "@/components/tools/GreetingCard";
import PlacesCard from "@/components/tools/PlacesCard";
import Api from "@/api/api";
import "@/components/Chat.css";
import AiThinkingLoader from "@/components/AiThinkingLoader";

const ChatTab = ({ local }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputRows, setInputRows] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Focus input on component load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus input when responses complete
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setInputRows(1);

    setTimeout(() => {
      setIsLoading(true);
    }, 600);

    const payload = {
      data: {
        text: input,
      },
    };

    Api.post(`/locals/${local.id}/chats`, payload)
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
              error.response?.data?.message || "Failed to get response"
            }`;
          }
          return updated;
        });
        setIsLoading(false);
      });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const rows = Math.min(Math.max(e.target.value.split("\n").length, 1), 5);
    setInputRows(rows);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-20 messages-container">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-6 welcome-message">
              <div className="w-12 h-12 mx-auto mb-3 p-2 rounded-full bg-gray-100">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Welcome to your AI Assistant!
              </h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto mb-4">
                I'm here to help you with various tasks. Ask me anything!
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>Ready to assist you</span>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <Fragment key={index}>
              {message.role === "user" && (
                <div className="text-sm flex justify-end items-start group animate-in fade-in-up duration-500">
                  <div className="bg-razzmatazz-500 text-white rounded-b-lg rounded-tl-lg px-3 py-2 max-w-[85%] group-hover:shadow-md message-bubble">
                    <p className="leading-relaxed text-sm">{message.content}</p>
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="flex items-start gap-2 group">
                  <div className="p-1.5 border border-gray-200 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="flex-1 animate-in animate-in fade-in-up duration-200">
                    <div className="px-2 pt-0 pb-4 text-sm max-w-[85%] message-bubble">
                      <div className="prose prose-sm text-gray-600">
                        <div
                          className="leading-relaxed text-sm"
                          dangerouslySetInnerHTML={{
                            __html: message.aiResponse,
                          }}
                        ></div>
                      </div>

                      {message.conversations &&
                        message.conversations.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {message.conversations.map(
                              (conversation, convIndex) => (
                                <Fragment key={convIndex}>
                                  {conversation.role === "assistant" && (
                                    <div className="prose prose-sm text-gray-600 text-sm">
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
                                      {conversation.tool_name ===
                                        "search_places" && (
                                        <PlacesCard
                                          placesData={JSON.parse(conversation.content).data}
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

          {isLoading && <AiThinkingLoader />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            placeholder="Type your message..."
            className="w-full text-sm border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:border-razzmatazz-400 focus:ring-2 focus:ring-razzmatazz-100 text-gray-800 placeholder-gray-400 input-field bg-white/90 backdrop-blur-sm shadow-lg"
            rows={inputRows}
            disabled={isLoading}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-razzmatazz-600 text-white hover:bg-razzmatazz-700 disabled:bg-gray-300 disabled:cursor-not-allowed send-button cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
