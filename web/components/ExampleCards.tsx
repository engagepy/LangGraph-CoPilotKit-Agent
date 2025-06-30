import React from "react";
import { ToolCard } from "./ToolResultCards";

const EX = {
  weather: ["Weather London?", "Raining in Ranchi?", "Goa 7-day forecast?"],
  math: ["25^3?", "√98765?", "1345+9827?"],
  web: ["AI breakthroughs?", "Hydrogen car news?", "Latest tech trends?"],
  currency: ["2500 INR to USD?", "Bitcoin price?", "100 EUR to JPY?"],
  holidays: ["India 2025 holidays?", "When is Diwali?", "US July holidays?"],
  nasa: ["Today's APOD?", "Popular Hubble image?", "Mars rover pic?"],
  crypto: ["Bitcoin price?", "Ethereum market cap?", "Dogecoin to USD?"],
  qr: ["Generate QR for google.com?", "QR code for my phone number?", "QR for WiFi network?"],
  url: ["Shorten bit.ly/example?", "Expand tinyurl.com/abc?", "URL info for github.com?"],
  timezone: ["Time in Tokyo?", "London to New York time?", "Current time in Sydney?"],
  wiki: ["Wikipedia: Albert Einstein?", "Search: Quantum physics?", "Wiki: Machine learning?"],
  github: ["GitHub user: octocat?", "Repo: facebook/react?", "Trending repos this week?"],
  unit: ["Convert 10 miles to km?", "100 pounds to kg?", "32°F to Celsius?"],
  definition: ["Define: algorithm?", "What is blockchain?", "Meaning of API?"],
  news: ["Latest tech news?", "Breaking world news?", "Sports headlines today?"],
  ip: ["What's my IP?", "IP location lookup?", "IP info for 8.8.8.8?"],
};

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-yellow-200">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2" stroke="currentColor" />
    </svg>
  );
}

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

function ExampleCards({ themeColor }: { themeColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h2 className="text-5xl font-black text-white mb-2 tracking-tighter bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">Turtl🐢ai</h2>
      <p className="text-lg text-gray-200 mb-6 max-w-xl text-center">
        Your all-in-one assistant for calculations, research, utilities, and more. Try one of the tools below or ask anything!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          icon={<span>☀️</span>}
          title="Weather"
          subtitle="Get weather info."
          mainValue={<span>72°</span>}
          details={<span>Clear skies in SF</span>}
          themeColor={themeColor}
          prompts={EX.weather}
        />
        <ToolCard
          icon={<span>🔢</span>}
          title="Math & Calculations"
          subtitle="Add, multiply, etc."
          mainValue={<span>100 × 3 = 300</span>}
          details={<span>Quick math</span>}
          themeColor={themeColor}
          prompts={EX.math}
        />
        <ToolCard
          icon={<span>🌐</span>}
          title="Web Search"
          subtitle="Find news & facts."
          mainValue={<span>AI News</span>}
          details={<span>"OpenAI launches new model"</span>}
          themeColor={themeColor}
          prompts={EX.web}
        />
        <ToolCard
          icon={<span>💱</span>}
          title="Currency Converter"
          subtitle="Convert currencies."
          mainValue={<span>100 USD → 92 EUR</span>}
          details={<span>Live rates</span>}
          themeColor={themeColor}
          prompts={EX.currency}
        />
        <ToolCard
          icon={<span>📅</span>}
          title="Public Holidays"
          subtitle="Show holidays."
          mainValue={<span>India: Diwali</span>}
          details={<span>Nov&nbsp;12,&nbsp;2024</span>}
          themeColor={themeColor}
          prompts={EX.holidays}
        />
        <ToolCard
          icon={<span>🚀</span>}
          title="NASA APOD"
          subtitle="Picture of the Day."
          mainValue={<span>"Pillars..."</span>}
          details={<span>Space imagery</span>}
          themeColor={themeColor}
          prompts={EX.nasa}
        />
      </div>
      <div className="mt-8 text-white/80 text-center text-sm">
        <div>Try: <span className="bg-white/20 px-2 py-1 rounded">What's the weather in Paris?</span> or <span className="bg-white/20 px-2 py-1 rounded">Convert 10 miles to km</span></div>
      </div>
    </div>
  );
}

export default ExampleCards;
export { SunIcon, MoonIcon }; 