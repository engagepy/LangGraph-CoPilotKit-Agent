"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import WeatherCard from "../../components/WeatherCard";
import type { AgentState, WeatherResult } from "../types";

type Props = {
  themeColor: string;
  textColor: string;
  setState: (updater: AgentState | ((prev: AgentState) => AgentState)) => void;
};

export default function WeatherAction({ themeColor, textColor, setState }: Props) {
  useCopilotAction({
    name: "get_weather",
    description: "Get the weather for a given location.",
    parameters: [
      { name: "city", type: "string", required: true },
      { name: "temperature", type: "string", required: false },
      { name: "description", type: "string", required: false },
      { name: "humidity", type: "string", required: false },
      { name: "wind", type: "string", required: false },
      { name: "is_day", type: "boolean", required: false },
    ],
    handler: ({ city, temperature, description, humidity, wind }) => {
      const weatherResult: WeatherResult = {
        id: `weather-${Date.now()}`,
        type: "weather",
        location: city,
        temperature: temperature || "",
        description: description || "",
        humidity: humidity || "",
        wind: wind || "",
        feelsLike: temperature || "",
        timestamp: Date.now(),
      };

      setState((prev) => {
        if (!prev) {
          return {
            chatStarted: true,
            toolResults: [weatherResult],
            proverbs: [],
          } as AgentState;
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
      const isFetching = !result;
      const hasNoData = !args.temperature && !args.description && !args.humidity && !args.wind;

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
              Fetching weather for <b>{args.city || "..."}</b>...
            </span>
          </div>
        );
      }

      const data = result
        ? {
            location: result.city || result.location,
            temperature: result.temperature,
            description: result.description,
            humidity: result.humidity,
            wind: result.wind_speed,
            feelsLike: result.feelsLike ?? result.temperature,
            isDay: result.is_day,
          }
        : {
            location: args.city,
            temperature: args.temperature,
            description: args.description,
            humidity: args.humidity,
            wind: args.wind,
            feelsLike: args.temperature,
            isDay: true,
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

  return null;
}


