"use client";

import React, { useState, useEffect } from "react";
import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { ToolResultCard, ToolCard } from "../components/ToolResultCards";
import { SearchCard } from "../components/SearchCard";
import { MathCard } from "../components/MathCard";
import { CryptoCard } from "../components/CryptoCard";
import { NASACard } from "../components/NASACard";
import { QRCodeCard } from "../components/QRCodeCard";
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
          background: "#fff",
          color: "#444",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
          fontSize: "1rem",
          letterSpacing: "0.01em",
        }}
      >
        Cycle Theme Color
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
      // **guard**: don’t try to read result before it’s set
      const data = result
        ? {
            location:  result.city,
            temperature: result.temperature,
            description: result.description,
            humidity:    result.humidity,
            wind:        result.wind_speed,
            feelsLike:   result.temperature + 1,
          }
        : {
            // fallback to input-args for the very first tick
            location:    args.city,
            temperature: args.temperature,
            description: args.description,
            humidity:    args.humidity,
            wind:        args.wind,
            feelsLike:   args.temperature,
          };
  
      return (
        <WeatherCard
          location={data.location}
          themeColor={themeColor}
          textColor={textColor}
          temperature={data.temperature}
          description={data.description}
          humidity={data.humidity}
          wind={data.wind}
          feelsLike={data.temperature}
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
    render: ({ args }) => {
      return <IPCard 
        ip={args.ip as string}
        location={args.location}
        isp={args.isp}
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
    ],
    render: ({ args }) => {
      return <MathCard
        operation={args.operation as string}
        result={args.result as string}
        expression={args.expression as string}
        themeColor={themeColor}
        textColor={textColor}
      />
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
      return <CryptoCard
        symbol={result.cryptocurrency as string}
        price={result.price_usd as string}
        change24h={result.change_24h as string}
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
    render: ({ args }) => {
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
    render: ({ args }) => {
      return <UnitConversionCard
        fromValue={args.original_value || '1'}
        fromUnit={args.from_unit as string}
        toValue={args.result as string}
        toUnit={args.to_unit as string}
        type="general"
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  // Math Operations UI Components
  useCopilotAction({
    name: "add",
    description: "Display addition results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <MathCard
        operation="add"
        result={args.result as string}
        expression={args.expression as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "multiply",
    description: "Display multiplication results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <MathCard
        operation="multiply"
        result={args.result as string}
        expression={args.expression as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

  useCopilotAction({
    name: "divide",
    description: "Display division results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <MathCard
        operation="divide"
        result={args.result as string}
        expression={args.expression as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    },
  });

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
    render: ({ args }) => {
      return <QRCodeCard
        qrCodeUrl={args.qr_code_url as string}
        data={args.content as string}
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
    render: ({ args }) => {
      return <URLCard
        shortUrl={args.short_url as string}
        originalUrl={args.original_url as string}
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

  // News Search UI Component  
  useCopilotAction({
    name: "search_news",
    description: "Display news search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true }, // JSON string of results array
    ],
    render: ({ result, args }) => {
      let results;
      try {
        results = typeof result.results === 'string' ? JSON.parse(result.results) : result.results;
      } catch (e) {
        results = result.results;
      }
      
      return <SearchCard
        type="news"
        query={result.query as string}
        answer={result.answer as string}
        results={Array.isArray(results) ? results : results ? [results] : undefined}
        themeColor={themeColor}
        textColor={textColor}
      />
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
    render: ({ args }) => {
      let results;
      try {
        results = typeof args.results === 'string' ? JSON.parse(args.results) : args.results;
      } catch (e) {
        results = args.results;
      }
      
      return <SearchCard
        type="academic"
        query={args.query as string}
        answer={args.answer as string}
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
    render: ({ args }) => {
      return <UnitConversionCard
        fromValue={args.original_value || '1'}
        fromUnit={args.from_unit as string}
        toValue={args.result as string}
        toUnit={args.to_unit as string}
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
            wind={result.wind}
            feelsLike={result.feelsLike}
          />
        </div>
      );
    default:
      return null;
  }
}

// Example cards for the main screen
function ExampleCards({ themeColor }: { themeColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h2 className="text-5xl font-black text-white mb-2 tracking-tighter bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">Turtl🐢ai </h2>
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

// Simple sun icon for the weather card
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-yellow-200">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2" stroke="currentColor" />
    </svg>
  );
}

 