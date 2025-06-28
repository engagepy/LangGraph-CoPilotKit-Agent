"use client";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { ToolResultCard } from "../components/ToolResultCards";

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/guides/frontend-actions
  useCopilotAction({
    name: "setThemeColor",
    parameters: [{
      name: "themeColor",
      description: "The theme color to set. Make sure to pick nice colors.",
      required: true, 
    }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  return (
    <main style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
      <YourMainContent themeColor={themeColor} />
      <CopilotSidebar
        clickOutsideToClose={false}
        defaultOpen={true}
        labels={{
          title: "Turtl AI Assistant",
          initial: "👋 Hi there! I'm Turtl AI, your intelligent assistant powered by LangGraph.\n\nI have access to many powerful tools including:\n\n**🧮 Math & Calculations**\n- Add, multiply, divide numbers\n- Unit conversions (general & land units)\n\n**🌍 Information & Search**\n- Web search, news & academic research\n- Wikipedia summaries\n- Dictionary definitions\n\n**📊 Data & Finance**\n- Cryptocurrency prices\n- Weather information\n- Public holidays\n\n**🔧 Utilities**\n- GitHub trending repositories\n- URL shortening\n- QR code generation\n- IP information\n- Timezone conversion\n- NASA Astronomy Picture of the Day\n\n**🎨 UI Customization**\n- \"Change theme to blue\" or any color\n\nTry asking me anything! For example:\n- \"What's the weather in San Francisco?\"\n- \"Convert 100 USD to EUR\"\n- \"Search for latest AI news\"\n- \"Generate a QR code for my website\"\n- \"Set the theme to purple\""
        }}
      />
    </main>
  );
}

// State of the agent - matching your LangGraph agent capabilities
type AgentState = {
  tool_results: Array<{
    tool_name: string;
    result: any;
    timestamp: string;
  }>;
  conversation_summary: string;
}

function YourMainContent({ themeColor }: { themeColor: string }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/coagents/shared-state
  const {state, setState} = useCoAgent<AgentState>({
    name: "agent", // This matches your NEXT_PUBLIC_COPILOTKIT_AGENT_NAME
    initialState: {
      tool_results: [],
      conversation_summary: "Ready to assist with calculations, research, utilities and more!",
    },
  });

  // 🪁 Frontend Actions for tool result management
  useCopilotAction({
    name: "addToolResult",
    parameters: [{
      name: "tool_name",
      description: "The name of the tool that was used",
      required: true,
    }, {
      name: "result",
      description: "The result from the tool execution",
      required: true,
    }],
    handler: ({ tool_name, result }) => {
      const newToolResult = {
        tool_name,
        result,
        timestamp: new Date().toISOString(),
      };
      setState({
        ...state,
        tool_results: [...(state.tool_results || []), newToolResult],
      });
    },
  });

  // Action to clear tool results
  useCopilotAction({
    name: "clearToolResults",
    description: "Clear all tool results from the display",
    parameters: [],
    handler: () => {
      setState({
        ...state,
        tool_results: [],
      });
    },
  });

  // Action to update conversation summary
  useCopilotAction({
    name: "updateSummary",
    parameters: [{
      name: "summary",
      description: "Updated conversation summary",
      required: true,
    }],
    handler: ({ summary }) => {
      setState({
        ...state,
        conversation_summary: summary,
      });
    },
  });

  // Render tool results for specific tools with beautiful UI
  const renderToolResults = () => {
    if (!state.tool_results || state.tool_results.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Tool Results</h3>
        {state.tool_results.slice(-5).reverse().map((toolResult, index) => (
          <ToolResultCard
            key={`${toolResult.tool_name}-${toolResult.timestamp}-${index}`}
            toolName={toolResult.tool_name}
            result={toolResult.result}
            themeColor={themeColor}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen w-screen flex justify-center items-center flex-col transition-colors duration-300 overflow-hidden"
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Turtl AI Dashboard</h1>
          <p className="text-gray-200 italic">LangGraph Multi-Tool Agent with CopilotKit Integration</p>
          <div className="mt-4 text-sm text-gray-200 opacity-80">
            🚀 LangGraph API: <code className="bg-white/20 px-2 py-1 rounded">http://127.0.0.1:2024</code>
          </div>
        </div>
        
        <hr className="border-white/20 my-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Conversation Summary */}
          <div className="space-y-4">
            <div className="bg-white/15 p-6 rounded-xl text-white">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">💬</span>
                Conversation Status
              </h2>
              <p className="text-sm opacity-90 leading-relaxed">
                {state.conversation_summary}
              </p>
              <button 
                onClick={() => setState({...state, tool_results: []})}
                className="mt-4 bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Clear Results
              </button>
            </div>

            {/* Available Tools Info */}
            <div className="bg-white/15 p-6 rounded-xl text-white">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">🛠️</span>
                Available Tools
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>• Math operations</div>
                <div>• Weather info</div>
                <div>• Web search</div>
                <div>• Crypto prices</div>
                <div>• GitHub trends</div>
                <div>• Unit conversion</div>
                <div>• QR codes</div>
                <div>• URL shortening</div>
                <div>• NASA APOD</div>
                <div>• Wikipedia</div>
                <div>• Public holidays</div>
                <div>• And more!</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tool Results */}
          <div className="space-y-4">
            {renderToolResults()}
            {(!state.tool_results || state.tool_results.length === 0) && (
              <div className="bg-white/15 p-8 rounded-xl text-white text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">No Tool Results Yet</h3>
                <p className="text-sm opacity-80">
                  Ask me to use any tool and the results will appear here in beautiful cards!
                </p>
                <div className="mt-4 text-xs opacity-60">
                  Try: "What's the weather?" or "Convert 10 miles to kilometers"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with connection status */}
        <div className="mt-6 pt-4 border-t border-white/20 text-center text-xs text-white/60">
          <span className="inline-flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Connected to LangGraph Agent at localhost:2024
          </span>
        </div>
      </div>
    </div>
  );
} 