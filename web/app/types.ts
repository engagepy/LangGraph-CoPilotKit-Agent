export type WeatherResult = {
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

export type ToolResult = WeatherResult; // Extend later for other tools

export type AgentState = {
  proverbs: string[];
  chatStarted: boolean;
  toolResults: ToolResult[];
};


