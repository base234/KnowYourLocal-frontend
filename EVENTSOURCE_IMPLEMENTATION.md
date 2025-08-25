# EventSource Implementation for Chat Streaming

## Overview

This implementation replaces the fetch-based streaming with EventSource (Server-Sent Events) for real-time chat communication with tool calling support.

## Features

### 1. EventSource Streaming
- Uses native `EventSource` API for server-sent events
- Real-time streaming of chat responses
- Automatic reconnection handling
- Connection status monitoring

### 2. Tool Call Detection
- Automatically detects tool calls in the stream
- Special handling for `get_pokemon_info` tool
- Displays tool call information in the UI
- Shows tool arguments and results

### 3. Pokemon Data Display
- Dedicated `PokemonCard` component for Pokemon information
- Displays sprite, stats, types, abilities, and other Pokemon data
- Automatically triggered when Pokemon tool call results are received

### 4. Debug Features
- Debug mode toggle to show raw EventSource data
- Connection status indicator (connected, error, timeout, disconnected)
- EventSource state monitoring
- Raw data capture and display

## Implementation Details

### EventSource Setup
```javascript
const newEventSource = new EventSource("http://localhost:3333/chat/stream");
```

### Event Handlers
- `onopen`: Connection established
- `onmessage`: Data received
- `onerror`: Connection errors

### Message Types Handled
- `connected`: Initial connection confirmation
- `content`: Chat content streaming
- `tool_call`: Tool execution requests
- `function_result`: Tool execution results
- `done`: Stream completion
- `error`: Error messages

### Pokemon Tool Call Detection
```javascript
if (data.type === "tool_call" && data.tool_call.name === "get_pokemon_info") {
  console.log("Pokemon tool call detected for:", data.tool_call.arguments);
}
```

## Usage

### Basic Chat
1. Type a message in the input field
2. Press Enter or click Send
3. EventSource connection is established
4. Stream response is displayed in real-time

### Pokemon Information
1. Ask about a Pokemon (e.g., "Tell me about Pikachu")
2. Tool call is detected and displayed
3. Pokemon data is received and displayed in PokemonCard
4. Special success message is shown

### Debug Mode
1. Click the "Debug" button to enable debug mode
2. Raw EventSource data is captured and displayed
3. Connection status and EventSource state are shown
4. Use "Test" button to verify EventSource connection

## Components

### PokemonCard
- Displays Pokemon sprite, name, ID, height, weight
- Shows types, abilities, and base stats
- Responsive grid layout for stats
- Styled with Tailwind CSS

### Connection Status
- Visual indicator (green/red/yellow/gray dot)
- Connection state text
- EventSource readyState display
- Manual disconnect button

## Error Handling

- Automatic EventSource cleanup on errors
- Timeout protection (30 seconds)
- Connection state monitoring
- Error status display
- Graceful fallback on connection issues

## Testing

### Test Buttons
- **Test**: Tests EventSource connection
- **Test Pokemon**: Simulates Pokemon data reception
- **Debug**: Toggles debug mode
- **Disconnect**: Manually closes EventSource

### Sample Data
The implementation includes sample Pokemon data for testing:
```javascript
{
  name: "pikachu",
  id: 25,
  height: 4,
  weight: 60,
  types: ["electric"],
  abilities: ["static", "lightning-rod"],
  stats: [...],
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}
```

## Configuration

- EventSource URL: `http://localhost:3333/chat/stream`
- Timeout: 30 seconds
- Debug mode: Toggleable
- Connection status: Real-time updates

## Browser Support

EventSource is supported in all modern browsers:
- Chrome 6+
- Firefox 6+
- Safari 5+
- Edge 79+

## Future Enhancements

- Automatic reconnection on connection loss
- Message queuing during disconnections
- Custom EventSource event types
- WebSocket fallback for older browsers
- Connection pooling for multiple streams
