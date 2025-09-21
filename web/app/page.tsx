"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCoAgent } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import WeatherCard from "../components/WeatherCard";
import "../app/globals.css";
import ExampleCards from "../components/ExampleCards";
import SetThemeColorAction from "./actions/SetThemeColorAction";
import StartChatAction from "./actions/StartChatAction";
import WeatherAction from "./actions/WeatherAction";
import IPInfoAction from "./actions/IPInfoAction";
import MathResultAction from "./actions/MathResultAction";
import CryptoPriceAction from "./actions/CryptoPriceAction";
import NASAAPODAction from "./actions/NASAAPODAction";
import PublicHolidaysAction from "./actions/PublicHolidaysAction";
import UnitConversionAction from "./actions/UnitConversionAction";
import MathOpsActions from "./actions/MathOpsActions";
import WikipediaSummaryAction from "./actions/WikipediaSummaryAction";
import GitHubTrendingAction from "./actions/GitHubTrendingAction";
import QRCodeAction from "./actions/QRCodeAction";
import URLShortenAction from "./actions/URLShortenAction";
import TimezoneAction from "./actions/TimezoneAction";
import WordDefinitionAction from "./actions/WordDefinitionAction";
import SearchActions from "./actions/SearchActions";
import LandUnitConversionAction from "./actions/LandUnitConversionAction";
import type { AgentState, ToolResult } from "./types";

// Types moved to separate file for reuse

// Utility to check if a color is light
function isColorLight(hex: string): boolean {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((x: string) => x + x).join('');
  const r = parseInt(hex.substr(0,2),16);
  const g = parseInt(hex.substr(2,2),16);
  const b = parseInt(hex.substr(4,2),16);
  return (0.299*r + 0.587*g + 0.114*b) > 186;
}

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  // Add a button to manually test theme color change
  const presetColors = [
    "#6366f1", // Default Indigo (original)
    "#f5e8ff", // Pastel Lavender
    "#ffe4e1", // Pastel Pink
    "#e0f7fa", // Pastel Cyan
    "#fff9c4", // Pastel Yellow
    "#d0f5e8", // Pastel Mint
    "#fce4ec", // Pastel Rose
    "#e3f2fd", // Pastel Blue
    "#f3e5f5", // Pastel Purple
    // add dark colors
    // futurisitic glossy black black 
    "#000000", // Glossy Black
    "#1a1a1a", // Glossy Dark Gray
    

  ];
  const [colorIndex, setColorIndex] = useState(0);
  const handleCycleColor = () => {
    const nextIndex = (colorIndex + 1) % presetColors.length;
    setColorIndex(nextIndex);
    setThemeColor(presetColors[nextIndex]);
  };

  useEffect(() => {
    const userMessageColor = themeColor === "#6366f1" ? "#fff" : "#000";
    document.documentElement.style.setProperty('--user-message-color', userMessageColor);
  }, [themeColor]);

  // Mounted via JSX below

  const isLightBg = isColorLight(themeColor);
  const textColor = isLightBg ? "#222" : "#fff";

  return (
    <div
      style={{
        "--copilot-kit-primary-color": themeColor,
        backgroundColor: themeColor,
        color: textColor,
        '--sidebar-text-color': textColor,
      } as React.CSSProperties}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      {/* Manual theme color test button */}
      <button
        onClick={handleCycleColor}
        className="fixed top-4 left-4 z-50 px-5 py-2 rounded-full font-semibold shadow-lg border border-gray-200 transition-colors duration-200"
        style={{
          background: "#6366f1",
          color: "#fff",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
          fontSize: "1rem",
          letterSpacing: "0.01em",
        }}
      >
        Cycle Theme
      </button>
      <button
        onClick={() => window.open("https://github.com/engagepy/LangGraph-Multi-Tool-Agent/tree/main", "_blank", "noopener,noreferrer")}
        className="fixed top-20 left-4 z-50 px-5 py-2 rounded-full font-semibold shadow-lg border border-gray-200 transition-colors duration-200"
        style={{
          background: "#6366f1",
          color: "#fff",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
          fontSize: "1rem",
          letterSpacing: "0.01em",
          minWidth: "142.3px",
        }}
      >
        <svg
          className="w-5 h-5 inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        GitHub
      </button>
      {/* Sidebar - overlay style */}
      <div className="peer">
        <CopilotSidebar
          clickOutsideToClose={false}
          defaultOpen={true}
          onThumbsUp={(message) => console.log(message)} 
          onThumbsDown={(message) => console.log(message)}  
          labels={{
            title: "🐢.ai",
            initial: "👋 Hi, there! You're chatting with an agent. This agent comes with a few tools to get you started.\n\nFor example you can try:\n- **Frontend Tools**: \"Set the theme to orange\"\n- **Shared State**: \"Write a proverb about AI\"\n- **Generative UI**: \"Get the weather in SF\"\n- **Web Search**: \"Search for latest AI news\"\n- **Math Tools**: \"Calculate 15% of 250\"\n- **Weather**: \"What's the weather in Tokyo?\"\n- **Currency**: \"Convert 100 USD to EUR\"\n- **NASA APOD**: \"Show me today's NASA picture\"\n\nAs you interact with the agent, you'll see the UI update in real-time to reflect the agent's **state**, **tool calls**, and **progress**."
          }}
        />
      </div>
      
      {/* Main Content Area - always centered, overlay safe */}
      <div
        className="absolute inset-0 flex justify-center items-center transition-all duration-300"
      >
        <YourMainContent themeColor={themeColor} textColor={textColor} />
        <SetThemeColorAction onSetThemeColor={setThemeColor} />
      </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* ... existing code ... */}
      </footer>
    </div>
  );
}

function YourMainContent({ themeColor, textColor }: { themeColor: string; textColor: string }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/coagents/shared-state
  const {state, setState} = useCoAgent<AgentState>({
    name: "agent", // This matches your NEXT_PUBLIC_COPILOTKIT_AGENT_NAME
    initialState: {
      proverbs: [
        "CopilotKit may be new, but its the best thing since sliced bread.",
      ],
      chatStarted: false,
      toolResults: [],
    },
  })

  // Mount actions within JSX below

  // Debug: Log state changes
  console.log("Main component render - state:", state);

  // Show the main content with your beautiful tool cards or tool results
  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen w-full flex justify-center items-center flex-col transition-colors duration-300 overflow-hidden"
    >
      {/* Mount Copilot actions unconditionally so they always register */}
      <StartChatAction state={state} setState={setState as any} />
      <WeatherAction themeColor={themeColor} textColor={textColor} setState={setState as any} />
      <IPInfoAction themeColor={themeColor} textColor={textColor} />
      <MathResultAction themeColor={themeColor} textColor={textColor} />
      <MathOpsActions themeColor={themeColor} textColor={textColor} />
      <CryptoPriceAction themeColor={themeColor} textColor={textColor} />
      <NASAAPODAction themeColor={themeColor} textColor={textColor} />
      <PublicHolidaysAction themeColor={themeColor} />
      <UnitConversionAction themeColor={themeColor} textColor={textColor} />
      <WikipediaSummaryAction themeColor={themeColor} />
      <GitHubTrendingAction themeColor={themeColor} />
      <QRCodeAction themeColor={themeColor} textColor={textColor} />
      <URLShortenAction themeColor={themeColor} textColor={textColor} />
      <TimezoneAction themeColor={themeColor} />
      <WordDefinitionAction themeColor={themeColor} />
      <SearchActions themeColor={themeColor} textColor={textColor} />
      <LandUnitConversionAction themeColor={themeColor} textColor={textColor} />
      {!state.chatStarted ? (
        // Landing screen with example cards
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <ExampleCards themeColor={themeColor} />
        </div>
      ) : (
        // Tool results area
        <div className="w-full h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-white mb-6 text-center tracking-tighter bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg"></h2>
            
            {state.toolResults.length === 0 ? (
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center">
                <p className="text-white/80 text-lg">Tool results will appear here as you interact with the assistant...</p>
                <p className="text-white/60 text-sm mt-2">Try asking: "What's the weather in San Francisco?"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.toolResults.map((result: ToolResult) => (
                  <ToolResultRenderer key={result.id} result={result} themeColor={themeColor} textColor={textColor} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Component to render individual tool results
function ToolResultRenderer({ result, themeColor, textColor }: { result: ToolResult; themeColor: string; textColor: string }) {
  switch (result.type) {
    case 'weather':
      return (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <WeatherCard 
            location={result.location} 
            themeColor={themeColor}
            textColor={textColor}
            temperature={result.temperature}
            description={result.description}
            humidity={result.humidity}
            wind_speed={result.wind}
            feelsLike={result.feelsLike}
          />
        </div>
      );
    default:
      return null;
  }
}

// Simple sun icon for the weather card
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-yellow-200">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2" stroke="currentColor" />
    </svg>
  );
}

// Simple moon icon for the weather card (night time)
function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-blue-200">
      <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.22-8.22 8.05 8.05 0 0 1 .73-3.37 1 1 0 0 0-.14-1.05 1 1 0 0 0-1.12-.22 10 10 0 1 0 12.22 12.22 1 1 0 0 0-.22-1.12zM12 19.5a7.5 7.5 0 0 1-5.19-12.81 10.13 10.13 0 0 0 7.5 7.5 7.5 7.5 0 0 1-2.31 5.31z"/>
      <circle cx="17" cy="7" r="1.5" fill="currentColor" className="text-blue-100"/>
      <circle cx="19" cy="4" r="1" fill="currentColor" className="text-blue-100"/>
      <circle cx="21" cy="6" r="0.5" fill="currentColor" className="text-blue-100"/>
    </svg>
  );
}

 