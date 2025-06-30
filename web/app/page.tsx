"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { ToolResultCard, ToolCard } from "../components/ToolResultCards";
import { SearchCard } from "../components/SearchCard";
import MathCard from "../components/MathCard";
import { CryptoCard } from "../components/CryptoCard";
import { NASACard } from "../components/NASACard";
import QRCodeCard from "../components/QRCodeCard";
import { URLCard } from "../components/URLCard";
import { TimezoneCard } from "../components/TimezoneCard";
import { WikipediaCard } from "../components/WikipediaCard";
import { GitHubCard } from "../components/GitHubCard";
import { HolidayCard } from "../components/HolidayCard";
import { UnitConversionCard } from "../components/UnitConversionCard";
import { DefinitionCard } from "../components/DefinitionCard";
import WeatherCard from "../components/WeatherCard";
import NewsCard from "../components/NewsCard";
import IPCard from "../components/IPCard";
import { ClipboardCopy, ArrowRight } from "lucide-react"; 
import "../app/globals.css";
import ExampleCards from "../components/ExampleCards";

// Tool result types
type WeatherResult = {
  id: string;
  type: 'weather';
  location: string;
  temperature?: string;
  description?: string;
  humidity?: string;
  wind?: string;
  feelsLike?: string;
  timestamp: number;
};

type ToolResult = WeatherResult; // Will extend this for other tools

// State of the agent, make sure this aligns with your agent's state.
type AgentState = {
  proverbs: string[];
  chatStarted: boolean;
  toolResults: ToolResult[];
}

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

  const isLightBg = isColorLight(themeColor);
  const textColor = isLightBg ? "#222" : "#fff";

  return (
    <div
      style={{
        "--copilot-kit-primary-color": themeColor,
        backgroundColor: themeColor,
        color: textColor,
        '--sidebar-text-color': textColor,
      }}
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
          labels={{
            title: "Turtl.ai",
            initial: "👋 Hi, there! You're chatting with an agent. This agent comes with a few tools to get you started.\n\nFor example you can try:\n- **Frontend Tools**: \"Set the theme to orange\"\n- **Shared State**: \"Write a proverb about AI\"\n- **Generative UI**: \"Get the weather in SF\"\n- **Web Search**: \"Search for latest AI news\"\n- **Math Tools**: \"Calculate 15% of 250\"\n- **Weather**: \"What's the weather in Tokyo?\"\n- **Currency**: \"Convert 100 USD to EUR\"\n- **NASA APOD**: \"Show me today's NASA picture\"\n\nAs you interact with the agent, you'll see the UI update in real-time to reflect the agent's **state**, **tool calls**, and **progress**."
          }}
        />
      </div>
      
      {/* Main Content Area - always centered, overlay safe */}
      <div
        className="absolute inset-0 flex justify-center items-center transition-all duration-300"
      >
        <YourMainContent themeColor={themeColor} textColor={textColor} />
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

  // Helper function to add tool result - removed, using direct setState in handlers

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/coagents/frontend-actions
  useCopilotAction({
    name: "startChat",
    description: "Start the chat session and show tool results area.",
    parameters: [],
    handler: () => {
      setState({
        ...state,
        chatStarted: true,
      });
    },
  });



  //🪁 Generative UI: https://docs.copilotkit.ai/coagents/generative-ui
  // Weather UI Component
  useCopilotAction({
    name:        'get_weather',
    description: 'Get the weather for a given location.',
    parameters: [
      { name: 'city',        type: 'string', required: true  },
      { name: 'temperature', type: 'string', required: false },
      { name: 'description', type: 'string', required: false },
      { name: 'humidity',    type: 'string', required: false },
      { name: 'wind',        type: 'string', required: false },
      { name: 'is_day',      type: 'boolean', required: false },
    ],
    handler: ({ city, temperature, description, humidity, wind }) => {
      const weatherResult: WeatherResult = {
        id:          `weather-${Date.now()}`,
        type:        'weather',
        location:    city,
        temperature: temperature  || '',
        description: description  || '',
        humidity:    humidity     || '',
        wind:        wind         || '',
        feelsLike:   temperature  || '',
        timestamp:   Date.now(),
      };
  
      setState(prev => {
        if (!prev) {
          return {
            chatStarted: true,
            toolResults: [weatherResult],
            proverbs:    [],  // keep TS happy
          };
        }
        return {
          ...prev,
          chatStarted: true,
          toolResults: [weatherResult, ...prev.toolResults],
        };
      });
  
      return weatherResult;
    },
    render: ({ result, args }) => {
      // Check for early/empty render, show a fetching state instead of WeatherCard
      const isFetching = !result ;
      const hasNoData =
        !args.temperature && !args.description && !args.humidity && !args.wind;
  
      if (
        isFetching &&
        hasNoData
      ) {
        // Minimal fetching state, could be animated or more styled if you wish
        return (
          <div
            className="flex items-center justify-center p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "1.5em",
              minHeight: "8em",
            }}
          >
            <span className="text-white/70 text-base">
              Fetching weather for <b>{args.city || "..."}</b>...
            </span>
          </div>
        );
      }
  
      // When there's real data, render as usual
            const data = result
        ? {
            location:  result.city || result.location,
            temperature: result.temperature,
            description: result.description,
            humidity:    result.humidity,
            wind:        result.wind_speed,
            feelsLike:   result.feelsLike ?? result.temperature,
            isDay:       result.is_day,
          }
        : {
            location:    args.city,
            temperature: args.temperature,
            description: args.description,
            humidity:    args.humidity,
            wind:        args.wind,
            feelsLike:   args.temperature,
            isDay:       true, // default to day if no data
          };

      return (
        <WeatherCard
          location={data.location}
          themeColor={themeColor}
          textColor={textColor}
          temperature={data.temperature}
          description={data.description}
          humidity={data.humidity}
          wind_speed={data.wind}
          feelsLike={data.feelsLike}
          isDay={data.isDay}
        />
      );
    },
  });

  // More tool actions will be added here later...

  // IP Information UI Component
  useCopilotAction({
    name: "get_ip_info",
    description: "Display IP information in a card.",
    parameters: [
      { name: "ip", type: "string", required: true },
      { name: "location", type: "string", required: false },
      { name: "isp", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      return <IPCard 
        ip={result?.ip as string}
        location={result?.location}
        isp={result?.isp}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Math/Calculator Results UI Component
  useCopilotAction({
    name: "math_result",
    description: "Display math calculation results.",
    parameters: [
      { name: "operation", type: "string", required: true },
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
      { name: "error", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      // Show loading state if neither result nor essential values are present
      const isFetching = !result || (Object.keys(result).length === 0);
      const hasNoData = (!args.result && !result?.result);
  
      if (isFetching && hasNoData) {
        return (
          <div
            className="flex items-center justify-center p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "1.5em",
              minHeight: "8em",
            }}
          >
            <span className="text-white/70 text-base">
              Calculating <b>{args.operation || "math"}</b>...
            </span>
          </div>
        );
      }
  
      // Unpack the most up-to-date values (prefer result over args)
      const operation = result?.operation || args.operation;
      const mathResult = result?.result ?? args.result;
      const expression = result?.expression ?? args.expression;
      const a = result?.a ?? args.a;
      const b = result?.b ?? args.b;
      const error = result?.error ?? args.error;
  
      // Render error card if error exists
      if (error) {
        return (
          <div
            className="flex flex-col items-center justify-center p-8"
            style={{
              background: "rgba(255,0,0,0.04)",
              borderRadius: "1.5em",
              minHeight: "8em",
            }}
          >
            <span className="text-red-400 text-base font-bold">Math Error</span>
            <span className="text-red-300 text-sm mt-2">{error}</span>
          </div>
        );
      }
  
      // Otherwise, render the full MathCard as intended
      return (
        <MathCard
          operation={operation}
          result={mathResult}
          expression={expression}
          a={a}
          b={b}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  // Currency/Crypto UI Component
  useCopilotAction({
    name: "get_crypto_price",
    description: "Display cryptocurrency price information.",
    parameters: [
      { name: "symbol", type: "string", required: true },
      { name: "price_usd", type: "string", required: true },
      { name: "change_24h", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      // Check for early/empty render, show a fetching state instead of CryptoCard
      const isFetching = !result;
      const hasNoData = !args.price_usd && !result?.price_usd;

      if (isFetching && hasNoData) {
        // Minimal fetching state for crypto price
        return (
          <div
            className="flex items-center justify-center p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "1.5em",
              minHeight: "8em",
            }}
          >
            <span className="text-white/70 text-base">
              Fetching <b>{args.symbol || "crypto"}</b> price...
            </span>
          </div>
        );
      }

      // When there's real data, render as usual
      return <CryptoCard
        symbol={result?.cryptocurrency || args.symbol as string}
        price={result?.price_usd || args.price_usd as string}
        change24h={result?.change_24h || args.change_24h as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // NASA APOD UI Component
  useCopilotAction({
    name: "get_nasa_apod",
    description: "Display NASA Astronomy Picture of the Day.",
    parameters: [
      { name: "title", type: "string", required: true },
      { name: "date", type: "string", required: true },
      { name: "url", type: "string", required: false },
      { name: "explanation", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      return <NASACard
        title={args.title as string}
        date={args.date as string}
        url={args.url as string}
        explanation={args.explanation as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Public Holidays UI Component
  useCopilotAction({
    name: "get_public_holidays",
    description: "Display public holidays information.",
    parameters: [
      { name: "country", type: "string", required: true },
      { name: "holidays", type: "string", required: true },
    ],
    render: ({ args }) => {
      // Parse holidays string to array if needed
      let holidayArray = [];
      try {
        if (args.holidays) {
          const parsed = typeof args.holidays === 'string' ? JSON.parse(args.holidays) : args.holidays;
          holidayArray = Array.isArray(parsed) ? parsed : [{ name: String(args.holidays), date: 'Date not specified' }];
        }
      } catch (e) {
        // If parsing fails, create a single holiday entry from the raw string
        holidayArray = args.holidays ? [{ name: String(args.holidays), date: 'Date not specified' }] : [];
      }
      
      return <HolidayCard
        country={args.country as string}
        holidays={holidayArray}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Unit Conversion UI Component
  useCopilotAction({
    name: "convert_unit",
    description: "Display unit conversion results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "from_unit", type: "string", required: true },
      { name: "to_unit", type: "string", required: true },
      { name: "original_value", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      return <UnitConversionCard
        fromValue={result?.value || '1'}
        fromUnit={result?.from as string}
        toValue={result?.result as string}
        toUnit={result?.to as string}
        type="general"
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Math Operations UI Components
  useCopilotAction({
    name: "add",
    description: "Use for add operatons only. Display addition results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="add"
        result={result?.result as string}
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "multiply",
    description: "Use for multiply operatons only. Display multiplication results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="multiply"
        result={result?.result as string}
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "divide",
    description: "Use for divide operatons only. Display division results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="divide"
        result={result?.result as string}
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "subtract",
    description: "Use for subtract operatons only. Display subtraction results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="subtract"
        result={result?.result as string}
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "power",
    description: "Use for power operatons only. Display power results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="power"
        result={result?.result as string}      
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "modulo",
    description: "Use for modulo operatons only. Display modulo results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result, args }) => {
      return <MathCard
        operation="modulo"
        result={result?.result as string}
        expression={result?.expression as string}
        a={result?.a}
        b={result?.b}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Wikipedia Summary UI Component
        // Wikipedia Summary UI Component
  useCopilotAction({
    name: "get_wikipedia_summary",
    description: "Display Wikipedia summary.",
    parameters: [
      { name: "title", type: "string", required: true },
      { name: "summary", type: "string", required: true },
      { name: "url", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <WikipediaCard
        title={args.title as string}
        summary={args.summary as string}
        url={args.url as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // GitHub Trending UI Component
  useCopilotAction({
    name: "get_trending_github_repos",
    description: "Display trending GitHub repositories.",
    parameters: [
      { name: "repos", type: "string", required: true },
      { name: "language", type: "string", required: false },
    ],
    render: ({ args }) => {
      // Parse repos string to array if needed
      let repoArray = [];
      try {
        repoArray = typeof args.repos === 'string' ? JSON.parse(args.repos) : args.repos;
      } catch (e) {
        repoArray = [{ name: args.repos, language: args.language }];
      }
      
      return <GitHubCard
        repos={repoArray}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // QR Code UI Component
  useCopilotAction({
    name: "generate_qr_code",
    description: "Display generated QR code.",
    parameters: [
      { name: "qr_code_url", type: "string", required: true },
      { name: "content", type: "string", required: false },
    ],
    render: ({ result }) => {
      return <QRCodeCard
        qrCodeUrl={result?.qr_code_url as string}
        data={result?.content as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // URL Shortener UI Component
  useCopilotAction({
    name: "shorten_url",
    description: "Display shortened URL.",
    parameters: [
      { name: "short_url", type: "string", required: true },
      { name: "original_url", type: "string", required: false },
    ],
    render: ({ result }) => {
      return <URLCard
        shortUrl={result?.short_url as string}
        originalUrl={result?.original_url as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Timezone UI Component
  useCopilotAction({
    name: "get_current_timezone",
    description: "Display timezone information.",
    parameters: [
      { name: "timezone", type: "string", required: true },
      { name: "time", type: "string", required: true },
      { name: "location", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <TimezoneCard
        timezone={args.timezone as string}
        time={args.time as string}
        location={args.location as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Dictionary/Word Definition UI Component
  useCopilotAction({
    name: "get_word_definition",
    description: "Display word definition.",
    parameters: [
      { name: "word", type: "string", required: true },
      { name: "definition", type: "string", required: true },
      { name: "part_of_speech", type: "string", required: false },
      { name: "example", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <DefinitionCard
        word={args.word as string}
        definition={args.definition as string}
        partOfSpeech={args.part_of_speech as string}
        example={args.example as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "search_news", // Or "web_search"
    description: "Display news/web search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true }, // JSON string of results array
    ],
    render: ({ result, args }) => {
      // Always parse query/answer/results, fallback to args or empty
      const query = result?.query || args?.query || "";
      const answer = result?.answer || args?.answer || "";
      let resultsArr = [];
      try {
        resultsArr =
          typeof result?.results === "string"
            ? JSON.parse(result.results)
            : result?.results || [];
      } catch {
        resultsArr = [];
      }
  
      return (
        <SearchCard
          type={result?.name === "web_search" ? "web" : "news"}
          query={query}
          answer={answer}
          results={resultsArr}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  useCopilotAction({
    name: "web_search", // Or "web_search"
    description: "Display news/web search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true }, // JSON string of results array
    ],
    render: ({ result, args }) => {
      // Always parse query/answer/results, fallback to args or empty
      const query = result?.query || args?.query || "";
      const answer = result?.answer || args?.answer || "";
      let resultsArr = [];
      try {
        resultsArr =
          typeof result?.results === "string"
            ? JSON.parse(result.results)
            : result?.results || [];
      } catch {
        resultsArr = [];
      }
  
      return (
        <SearchCard
          type={result?.name === "web_search" ? "web" : "web"}
          query={query}
          answer={answer}
          results={resultsArr}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  // Academic Search UI Component
  useCopilotAction({
    name: "search_academic",
    description: "Display academic search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true }, // JSON string of results array
    ],
    render: ({ result }) => {
      let results;
      try {
        results = typeof result.results === 'string' ? JSON.parse(result.results) : result.results;
      } catch (e) {
        results = result.results;
      }
      
      return <SearchCard
        type="academic"
        query={result.query as string}
        answer={result.results as string}
        results={Array.isArray(results) ? results : results ? [results] : undefined}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Land Unit Conversion UI Component
  useCopilotAction({
    name: "convert_land_unit",
    description: "Display land unit conversion results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "from_unit", type: "string", required: true },
      { name: "to_unit", type: "string", required: true },
      { name: "original_value", type: "string", required: false },
    ],
    render: ({ result }) => {
      const isFetching = !result || "Loading...";
      return <UnitConversionCard
        fromValue={result?.value|| '1'}
        fromUnit={result?.from as string}
        toValue={result?.result as string}
        toUnit={result?.to as string}
        type="land"
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Debug: Log state changes
  console.log("Main component render - state:", state);

  // Show the main content with your beautiful tool cards or tool results
  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen w-full flex justify-center items-center flex-col transition-colors duration-300 overflow-hidden"
    >
      {!state.chatStarted ? (
        // Landing screen with example cards
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <ExampleCards themeColor={themeColor} />
        </div>
      ) : (
        // Tool results area
        <div className="w-full h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-white mb-6 text-center tracking-tighter bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">Turtl.ai</h2>
            
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

 