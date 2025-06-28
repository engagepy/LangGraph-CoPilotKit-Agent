"use client";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { ToolResultCard, ToolCard } from "../components/ToolResultCards";

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

function ExampleCards({ themeColor }: { themeColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h2 className="text-3xl font-bold text-white mb-2">Welcome to Turtl AI</h2>
      <p className="text-lg text-gray-200 mb-6 max-w-xl text-center">
        Your all-in-one assistant for calculations, research, utilities, and more. Try one of the tools below or ask anything!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          icon={<span className="text-4xl">☀️</span>}
          title="Weather"
          subtitle="Get current weather info for any city."
          mainValue={<span className="text-2xl">72°</span>}
          details={<span>Clear skies in San Francisco</span>}
          themeColor={themeColor}
        />
        <ToolCard
          icon={<span className="text-4xl">🔢</span>}
          title="Math & Calculations"
          subtitle="Add, multiply, or convert units."
          mainValue={<span className="text-2xl">100 × 3 = 300</span>}
          details={<span>Quick, accurate math</span>}
          themeColor={themeColor}
        />
        <ToolCard
          icon={<span className="text-4xl">🌐</span>}
          title="Web Search"
          subtitle="Find news, facts, and more."
          mainValue={<span className="text-2xl">AI News</span>}
          details={<span>"OpenAI launches new model"</span>}
          themeColor={themeColor}
        />
        <ToolCard
          icon={<span className="text-4xl">💱</span>}
          title="Currency Converter"
          subtitle="Convert between currencies."
          mainValue={<span className="text-2xl">100 USD → 92 EUR</span>}
          details={<span>Live rates</span>}
          themeColor={themeColor}
        />
        <ToolCard
          icon={<span className="text-4xl">📅</span>}
          title="Public Holidays"
          subtitle="See holidays for any country."
          mainValue={<span className="text-2xl">India: Diwali</span>}
          details={<span>Nov 12, 2024</span>}
          themeColor={themeColor}
        />
        <ToolCard
          icon={<span className="text-4xl">🚀</span>}
          title="NASA APOD"
          subtitle="Astronomy Picture of the Day."
          mainValue={<span className="text-2xl">"Pillars of Creation"</span>}
          details={<span>Stunning space imagery</span>}
          themeColor={themeColor}
        />
      </div>
      <div className="mt-8 text-white/80 text-center text-sm">
        <div>Try: <span className="bg-white/20 px-2 py-1 rounded">What's the weather in Paris?</span> or <span className="bg-white/20 px-2 py-1 rounded">Convert 10 miles to kilometers</span></div>
      </div>
    </div>
  );
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
    handler: ({ tool_name, result }: { tool_name: string; result: any }) => {
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
    handler: ({ summary }: { summary: string }) => {
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
      <div className="flex flex-col items-center justify-center w-full">
        {state.tool_results.slice(-5).reverse().map((toolResult: { tool_name: string; result: any; timestamp: string }, index: number) => (
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

  // Out-canvas: show only if no tool results
  if (!state.tool_results || state.tool_results.length === 0) {
    return (
      <div
        style={{ backgroundColor: themeColor }}
        className="h-screen w-screen flex justify-center items-center flex-col transition-colors duration-300 overflow-hidden"
      >
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <ExampleCards themeColor={themeColor} />
        </div>
      </div>
    );
  }

  // Main tool result view (after first tool call)
  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen w-screen flex justify-center items-center flex-col transition-colors duration-300 overflow-hidden"
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {renderToolResults()}
      </div>
    </div>
  );
} 