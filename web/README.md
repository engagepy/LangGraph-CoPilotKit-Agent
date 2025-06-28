# LangGraph CopilotKit Integration App

A beautiful Next.js application that integrates CopilotKit with your LangGraph multi-tool agent, providing an intelligent AI assistant interface with real-time tool result visualization.

## Features

🤖 **AI Assistant Integration**
- Seamless connection to LangGraph agent running on localhost:2024
- Real-time conversation with Turtl AI assistant
- Comprehensive tool support including math, weather, search, crypto, and utilities

🎨 **Beautiful UI Components**
- Dynamic theme color customization
- Glassmorphism design with backdrop blur effects
- Responsive tool result cards with appropriate icons
- Real-time tool result visualization

🛠️ **Tool Support**
- **Math**: Add, multiply, divide, unit conversions
- **Information**: Web search, news, academic research, Wikipedia
- **Finance**: Cryptocurrency prices and market data  
- **Utilities**: QR codes, URL shortening, GitHub trends
- **Data**: Weather, public holidays, NASA APOD, timezone info
- **Network**: IP information and network utilities

## Getting Started

### Prerequisites

Ensure your LangGraph dev server is running:
```bash
# In your main project directory
langgraph dev
```

This should start your agent at `http://127.0.0.1:2024`

### Installation

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The app uses these environment variables (already configured in `.env.local`):

```env
NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL=http://localhost:2024
NEXT_PUBLIC_COPILOTKIT_AGENT_NAME=agent
```

## Usage Examples

### Theme Customization
- "Set the theme to blue"
- "Change color to purple"
- "Make it orange"

### Tool Usage
- "What's the weather in New York?"
- "Convert 100 USD to EUR"
- "Search for latest AI news"
- "What are the trending GitHub repositories?"
- "Generate a QR code for https://example.com"
- "What's 25 * 37?"
- "Get public holidays for USA"

### Utility Functions
- "Shorten this URL: https://very-long-url.com"
- "What's my IP address information?"
- "Show me today's NASA picture"
- "Convert 10 miles to kilometers"

## Architecture

### Components
- **`app/page.tsx`**: Main application page with CopilotKit integration
- **`components/ToolResultCards.tsx`**: Beautiful UI cards for displaying tool results
- **`app/layout.tsx`**: Root layout with CopilotKit provider
- **`app/globals.css`**: Global styles with dark/light theme support

### Integration Points
- **CopilotKit Provider**: Handles connection to LangGraph runtime
- **Shared State**: Manages conversation state and tool results
- **Frontend Actions**: Handles theme changes and tool result management
- **Tool Result Rendering**: Dynamic component rendering based on tool type

## Customization

### Adding New Tool Cards
To add support for new tools, edit `components/ToolResultCards.tsx` and add a new case in the switch statement:

```typescript
case 'your_new_tool':
  return (
    <div style={cardBaseStyle}>
      <div style={contentStyle}>
        {/* Your custom tool result UI */}
      </div>
    </div>
  );
```

### Styling
The app uses Tailwind CSS with custom CSS variables. Modify `app/globals.css` to customize the overall theme and appearance.

## Development

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Tech Stack
- **Next.js 14**: React framework
- **CopilotKit**: AI integration framework
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **Lucide React**: Icons

## Connection to LangGraph

The app connects to your LangGraph agent through:

1. **Runtime URL**: `http://localhost:2024` (your LangGraph dev server)
2. **Agent Name**: `agent` (matches your graph configuration)
3. **Tool Integration**: Automatic detection and rendering of tool results

Make sure your LangGraph agent is running and accessible at the specified URL before starting the Next.js app.

## Troubleshooting

### Common Issues

**CopilotKit connection errors:**
- Ensure LangGraph dev server is running on port 2024
- Check CORS settings if needed
- Verify environment variables are set correctly

**Tool results not displaying:**
- Check that tool names match between LangGraph and the ToolResultCard component
- Verify the agent state structure matches the expected format

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check that all required dependencies are installed

## Contributing

Feel free to extend this application with additional tool cards, UI improvements, or new features that enhance the LangGraph-CopilotKit integration experience. 