import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Calculator, Cloud, Code, Zap } from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import GreetingCard from "@/components/GreetingCard";
import Api from "@/api/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventSource, setEventSource] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [debugMode, setDebugMode] = useState(false);
  const [rawData, setRawData] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Cleanup EventSource on component unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  // Clear debug data when debug mode is toggled off
  useEffect(() => {
    if (!debugMode) {
      setRawData([]);
    }
  }, [debugMode]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Clear debug data for new conversation
    if (debugMode) {
      setRawData([]);
    }

    // Create assistant message placeholder
    let assistantMessage = {
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      toolCalls: [],
      functionResults: [],
    };

    setMessages((prev) => [...prev, assistantMessage]);

    const payload = {
      data: {
        text: input,
      },
    };

    // Api.post("/chats", payload)
    //   .then((res) => {
    //     setMessages((prev) => [...prev, userMessage]);
    //     setInput("");
    //     setIsLoading(true);

    //     // Create assistant message
    //     let assistantMessage = {
    //       role: "assistant",
    //       content: "",
    //       timestamp: Date.now(),
    //       toolCalls: [],
    //       functionResults: [],
    //     };

    //     setMessages((prev) => [...prev, assistantMessage]);

    //     const newEventSource = new EventSource(
    //       "http://localhost:3333/chats/stream"
    //     );

    //     newEventSource.onmessage = (event) => {
    //       console.log(event);
    //     }

    //     setInput("");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setInput("");
    //   });
    // Api.post("/chats", payload)
    //   .then((res) => {
    //     console.log(res);
    //   const eventSource = new EventSource(
    //      "http://localhost:3333/chats/stream",
    //   );

    //   eventSource.onmessage = (event) => {
    //     console.log(event);
    //   }

    //   eventSource.onerror = (error) => {
    //     eventSource.close();
    //   };

    //   eventSource.addEventListener(
    //     'message',
    //     (event) => {
    //       const data = JSON.parse(event.data);
    //       console.log(data);
    //     },
    //     false,
    //   );

    //   setInput("");
    // });

    // First, create the chat and get the response
    await Api.post("/chats/stream-text", payload).then(response => {

      const chatData = response.data.data;

      // Handle the new API response format with tool_call_info
      if (
        chatData.tool_call_info &&
        chatData.tool_call_info.tool_call_executed
      ) {
        console.log("Tool call executed:", chatData.tool_call_info);

        // Update the assistant message with the AI response content
        if (chatData.ai_response && chatData.ai_response.content) {
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = chatData.ai_response.content;
            }
            return updated;
          });
        }

        // Handle tool call information
        if (chatData.tool_call_info.function_name === "get_pokemon_info") {
          console.log("Pokemon tool call executed:", chatData.tool_call_info);

          // Add tool call to the message
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.toolCalls = lastMessage.toolCalls || [];
              lastMessage.toolCalls.push({
                name: chatData.tool_call_info.function_name,
                arguments: chatData.tool_call_info.function_arguments,
                id: `tool_${Date.now()}`,
              });
            }
            return updated;
          });

          // Add function result with Pokemon data
          if (chatData.tool_call_info.tool_call_result) {
            setMessages((prev) => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.role === "assistant") {
                lastMessage.functionResults = lastMessage.functionResults || [];
                lastMessage.functionResults.push({
                  function_name: chatData.tool_call_info.function_name,
                  result: chatData.tool_call_info.tool_call_result,
                });
              }
              return updated;
            });
          }
        }
      } else {
        // Handle regular text responses without tool calls
        if (chatData.ai_response && chatData.ai_response.content) {
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = chatData.ai_response.content;
            }
            return updated;
          });
        }
      }

      // Legacy code for handling other response formats (keeping for backward compatibility)
      // Extract the assistant's message content
      if (chatData.output && chatData.output.length > 0) {
        const output = chatData.output[0];
        if (
          output.type === "message" &&
          output.content &&
          output.content.length > 0
        ) {
          const textContent = output.content.find(
            (content) => content.type === "output_text"
          );
          if (textContent) {
            // Update the assistant message with the received content
            setMessages((prev) => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.role === "assistant") {
                lastMessage.content = textContent.text;
              }
              return updated;
            });
          }
        }
      }

      // Check if there are tool calls in the response
      if (
        chatData.parallel_tool_calls &&
        chatData.tools &&
        chatData.tools.length > 0
      ) {
        console.log("Tool calls detected:", chatData.tools);

        // Handle tool calls if any
        chatData.tools.forEach((tool) => {
          if (
            tool.type === "tool_call" &&
            tool.tool_call.name === "get_pokemon_info"
          ) {
            console.log(
              "Pokemon tool call detected for:",
              tool.tool_call.arguments
            );

            // Add tool call to the message
            setMessages((prev) => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.role === "assistant") {
                lastMessage.toolCalls = lastMessage.toolCalls || [];
                lastMessage.toolCalls.push(tool.tool_call);
              }
              return updated;
            });
          }
        });
      }

      // Check if there are function results
      if (chatData.function_results && chatData.function_results.length > 0) {
        chatData.function_results.forEach((result) => {
          if (result.function_name === "get_pokemon_info") {
            console.log("Pokemon data received:", result.result);

            // Add function result to the message
            setMessages((prev) => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.role === "assistant") {
                lastMessage.functionResults = lastMessage.functionResults || [];
                lastMessage.functionResults.push({
                  function_name: result.function_name,
                  result: result.result,
                });
              }
              return updated;
            });
          }
        });
      }

      // Stop loading since we have the complete response
      setIsLoading(false);

      // Now try to establish EventSource for real-time updates
      // try {
      //   const newEventSource = new EventSource(
      //     "http://localhost:3333/chats/stream"
      //   );
      //   setEventSource(newEventSource);

      //   // Handle connection open
      //   newEventSource.onopen = () => {
      //     console.log("EventSource connection opened");
      //     setConnectionStatus("connecting");
      //   };

      //   newEventSource.onmessage = (event) => {
      //     // Capture raw data for debugging
      //     if (debugMode) {
      //       setRawData((prev) => [
      //         ...prev,
      //         { timestamp: Date.now(), data: event.data },
      //       ]);
      //     }

      //     try {
      //       const data = JSON.parse(event.data);

      //       if (data.type === "connected") {
      //         console.log("EventSource connected:", data.message);
      //         setConnectionStatus("connected");
      //       } else if (data.type === "content") {
      //         setMessages((prev) => {
      //           const updated = [...prev];
      //           const lastMessage = updated[updated.length - 1];
      //           if (lastMessage.role === "assistant") {
      //             lastMessage.content += data.content;
      //           }
      //           return updated;
      //         });
      //       } else if (data.type === "tool_call") {
      //         console.log("Tool call detected:", data.tool_call.name);
      //         if (data.tool_call.name === "get_pokemon_info") {
      //           console.log(
      //             "Pokemon tool call detected for:",
      //             data.tool_call.arguments
      //           );
      //         }
      //         setMessages((prev) => {
      //           const updated = [...prev];
      //           const lastMessage = updated[updated.length - 1];
      //           if (lastMessage.role === "assistant") {
      //             lastMessage.toolCalls = lastMessage.toolCalls || [];
      //             const existingIndex = lastMessage.toolCalls.findIndex(
      //               (call) => call.id === data.tool_call.id
      //             );
      //             if (existingIndex >= 0) {
      //               updated[updated.length - 1].toolCalls[existingIndex] =
      //                 data.tool_call;
      //             } else {
      //               updated[updated.length - 1].toolCalls.push(data.tool_call);
      //             }
      //           }
      //           return updated;
      //         });
      //       } else if (data.type === "function_result") {
      //         console.log("Function result received:", data.function_name);
      //         if (data.function_name === "get_pokemon_info") {
      //           console.log("Pokemon data received:", data.result);
      //           // Add a special message for Pokemon data
      //           setMessages((prev) => {
      //             const updated = [...prev];
      //             const lastMessage = updated[updated.length - 1];
      //             if (lastMessage.role === "assistant") {
      //               lastMessage.content += `\n\n🎉 Pokemon data received for ${data.result.name}!`;
      //             }
      //             return updated;
      //           });
      //         }
      //         setMessages((prev) => {
      //           const updated = [...prev];
      //           const lastMessage = updated[updated.length - 1];
      //           if (lastMessage.role === "assistant") {
      //             lastMessage.functionResults =
      //               lastMessage.functionResults || [];
      //             lastMessage.functionResults.push({
      //               function_name: data.function_name,
      //               result: data.result,
      //             });
      //           }
      //           return updated;
      //         });
      //       } else if (data.type === "tool_call_complete") {
      //         // Handle completed tool calls with results
      //         console.log("Tool call completed:", data);
      //         if (data.function_name === "get_pokemon_info" && data.result) {
      //           console.log(
      //             "Pokemon tool call completed with data:",
      //             data.result
      //           );

      //           // Update the message with the tool call result
      //           setMessages((prev) => {
      //             const updated = [...prev];
      //             const lastMessage = updated[updated.length - 1];
      //             if (lastMessage.role === "assistant") {
      //               lastMessage.functionResults =
      //                 lastMessage.functionResults || [];
      //               lastMessage.functionResults.push({
      //                 function_name: data.function_name,
      //                 result: data.result,
      //               });
      //             }
      //             return updated;
      //           });
      //         }
      //       } else if (data.type === "done") {
      //         setIsLoading(false);
      //         newEventSource.close();
      //         setEventSource(null);
      //         setConnectionStatus("disconnected");
      //       } else if (data.type === "error") {
      //         console.error("Stream error:", data.error);
      //         setMessages((prev) => {
      //           const updated = [...prev];
      //           const lastMessage = updated[updated.length - 1];
      //           if (lastMessage.role === "assistant") {
      //             lastMessage.content += `\n\n❌ Error: ${data.error}`;
      //           }
      //           return updated;
      //         });
      //         setIsLoading(false);
      //         newEventSource.close();
      //         setEventSource(null);
      //         setConnectionStatus("disconnected");
      //       }
      //     } catch (e) {
      //       console.error("Error parsing SSE data:", e);
      //     }
      //   };

      //   newEventSource.onerror = (error) => {
      //     console.error("EventSource error:", error);
      //     setIsLoading(false);
      //     newEventSource.close();
      //     setEventSource(null);
      //     setConnectionStatus("error");
      //   };

      //   // Close EventSource after a timeout to prevent hanging
      //   setTimeout(() => {
      //     if (newEventSource.readyState === EventSource.OPEN) {
      //       newEventSource.close();
      //       setIsLoading(false);
      //       setEventSource(null);
      //       setConnectionStatus("timeout");
      //     }
      //   }, 30000); // 30 second timeout
      // } catch (eventSourceError) {
      //   console.error("EventSource creation failed:", eventSourceError);
      //   setConnectionStatus("error");
      // }
    }).catch(error => {
      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content = `❌ Error: ${
            response.data?.message || "Failed to get response"
          }`;
        }
        return updated;
      });
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const closeConnection = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setConnectionStatus("disconnected");
      setIsLoading(false);
    }
  };

  const renderFunctionResult = (functionName, result) => {
    switch (functionName) {
      case "greet_hello_world":
        return <GreetingCard greetingData={result} />;

      case "get_pokemon_info":
        return (
          <div>
            <PokemonCard pokemonData={result} />;
            <p>Hello World</p>
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            AI Assistant with Tool Calling
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "error"
                  ? "bg-red-500"
                  : connectionStatus === "timeout"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600 capitalize">
              {connectionStatus}
            </span>
            {eventSource && (
              <span className="text-xs text-gray-500">
                (State:{" "}
                {eventSource.readyState === EventSource.CONNECTING
                  ? "Connecting"
                  : eventSource.readyState === EventSource.OPEN
                  ? "Open"
                  : eventSource.readyState === EventSource.CLOSED
                  ? "Closed"
                  : "Unknown"}
                )
              </span>
            )}
            {eventSource && (
              <button
                onClick={closeConnection}
                className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
              >
                Disconnect
              </button>
            )}
            <button
              onClick={() => setDebugMode(!debugMode)}
              className={`text-xs px-2 py-1 rounded ${
                debugMode
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              } hover:bg-opacity-80`}
            >
              Debug
            </button>
            <button
              onClick={() => {
                const testEventSource = new EventSource(
                  "http://localhost:3333/chat/stream"
                );
                testEventSource.onmessage = (event) => {
                  console.log("Test EventSource message:", event.data);
                  testEventSource.close();
                };
                testEventSource.onerror = () => {
                  console.log("Test EventSource error");
                  testEventSource.close();
                };
              }}
              className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
            >
              Test
            </button>
            <button
              onClick={() => {
                // Simulate receiving Pokemon data for testing
                const testPokemonData = {
                  name: "pikachu",
                  id: 25,
                  height: 4,
                  weight: 60,
                  types: ["electric"],
                  abilities: ["static", "lightning-rod"],
                  stats: [
                    { name: "hp", value: 35 },
                    { name: "attack", value: 55 },
                    { name: "defense", value: 40 },
                    { name: "special-attack", value: 50 },
                    { name: "special-defense", value: 50 },
                    { name: "speed", value: 90 },
                  ],
                  sprite:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                };

                setMessages((prev) => [
                  ...prev,
                  {
                    role: "assistant",
                    content: "Test Pokemon data received!",
                    timestamp: Date.now(),
                    functionResults: [
                      {
                        function_name: "get_pokemon_info",
                        result: testPokemonData,
                      },
                    ],
                  },
                ]);
              }}
              className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200"
            >
              Test Pokemon
            </button>
            <button
              onClick={() => {
                // Simulate the new API response format with tool_call_info
                const testApiResponse = {
                  status: "success",
                  message: "Chat processed successfully",
                  data: {
                    ai_response: {
                      role: "assistant",
                      content: "Here's information about Pikachu!",
                      refusal: null,
                      annotations: []
                    },
                    tool_call_info: {
                      tool_call_executed: true,
                      function_name: "get_pokemon_info",
                      function_arguments: { pokemon_name: "pikachu" },
                      tool_call_result: {
                        name: "pikachu",
                        id: 25,
                        height: 4,
                        weight: 60,
                        types: ["electric"],
                        abilities: ["static", "lightning-rod"],
                        stats: [
                          { name: "hp", value: 35 },
                          { name: "attack", value: 55 },
                          { name: "defense", value: 40 },
                          { name: "special-attack", value: 50 },
                          { name: "special-defense", value: 50 },
                          { name: "speed", value: 90 }
                        ],
                        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                      },
                      final_response_after_tool_call: true
                    }
                  }
                };

                // Simulate the API response processing
                const chatData = testApiResponse.data;

                // Create a new assistant message
                const newMessage = {
                  role: "assistant",
                  content: chatData.ai_response.content,
                  timestamp: Date.now(),
                  toolCalls: [],
                  functionResults: []
                };

                // Add tool call information
                if (chatData.tool_call_info.function_name === "get_pokemon_info") {
                  newMessage.toolCalls.push({
                    name: chatData.tool_call_info.function_name,
                    arguments: chatData.tool_call_info.function_arguments,
                    id: `tool_${Date.now()}`,
                  });

                  // Add function result with Pokemon data
                  if (chatData.tool_call_info.tool_call_result) {
                    newMessage.functionResults.push({
                      function_name: chatData.tool_call_info.function_name,
                      result: chatData.tool_call_info.tool_call_result,
                    });
                  }
                }

                setMessages((prev) => [...prev, newMessage]);
              }}
              className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200"
            >
              Test New API Format
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Try: "Hello World", "What's the weather in London?", "Calculate 15 *
          23", "Tell me about Pikachu", or use the test buttons above
        </p>
        {debugMode && (
          <p className="text-xs text-gray-500 mt-1">
            EventSource URL: http://localhost:3333/chats/stream
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-3xl ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white border shadow-sm"
                }`}
              >
                {message.content && (
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: formatPokemonResponse(message.content, hasPokemonToolCall(message))
                    }}
                  />
                )}

                {message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.toolCalls.map((toolCall, toolIndex) => (
                      <div
                        key={toolIndex}
                        className={`rounded-lg p-3 ${
                          toolCall.name === "get_pokemon_info"
                            ? "bg-yellow-50 border border-yellow-200"
                            : toolCall.name === "greet_hello_world"
                            ? "bg-green-50 border border-green-200"
                            : "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Code className={`w-4 h-4 ${
                            toolCall.name === "get_pokemon_info" ? "text-yellow-600" :
                            toolCall.name === "greet_hello_world" ? "text-green-600" :
                            "text-blue-600"
                          }`} />
                          <span className={`text-sm font-medium ${
                            toolCall.name === "get_pokemon_info" ? "text-yellow-800" :
                            toolCall.name === "greet_hello_world" ? "text-green-800" :
                            "text-blue-800"
                          }`}>
                            {toolCall.name === "get_pokemon_info" ? "🔍 Searching for Pokémon..." :
                             toolCall.name === "greet_hello_world" ? "👋 Greeting Function..." :
                             `Tool Call: ${toolCall.name}`}
                          </span>
                        </div>
                        {toolCall.arguments && (
                          <div className={`text-xs p-2 rounded ${
                            toolCall.name === "get_pokemon_info" ? "text-yellow-600 bg-yellow-100" :
                            toolCall.name === "greet_hello_world" ? "text-green-600 bg-green-100" :
                            "text-blue-600 bg-blue-100"
                          }`}>
                            {JSON.stringify(toolCall.arguments, null, 2)}
                          </div>
                        )}
                        {toolCall.name === "get_pokemon_info" && (
                          <div className="mt-2 text-xs text-yellow-700">
                            ⏳ Fetching Pokemon data...
                          </div>
                        )}
                        {toolCall.name === "greet_hello_world" && (
                          <div className="mt-2 text-xs text-green-700">
                            ⏳ Processing greeting...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {message.functionResults &&
                  message.functionResults.map((result, resultIndex) => (
                    <div key={resultIndex}>
                      {renderFunctionResult(
                        result.function_name,
                        result.result
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border shadow-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />

        {/* Debug Panel */}
        {debugMode && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Debug: Raw EventSource Data
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {rawData.map((item, index) => (
                <div
                  key={index}
                  className="text-xs bg-white p-2 rounded border"
                >
                  <div className="text-gray-500 mb-1">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                  <pre className="text-xs text-gray-700 overflow-x-auto">
                    {item.data}
                  </pre>
                </div>
              ))}
            </div>
            {rawData.length > 0 && (
              <button
                onClick={() => setRawData([])}
                className="text-xs text-gray-500 hover:text-gray-700 mt-2"
              >
                Clear Debug Data
              </button>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (try 'hello world', 'weather in Paris', 'calculate 5 + 3', or 'info about Charizard')"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
