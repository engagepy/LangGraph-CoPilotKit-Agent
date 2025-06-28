import React from "react";
import { BaseCard } from "./BaseCard";

export type WeatherCardProps = {
  location?: string;
  themeColor: string;
  temperature?: string;
  description?: string;
  humidity?: string;
  wind?: string;
  feelsLike?: string;
};

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-yellow-200">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2" stroke="currentColor" />
    </svg>
  );
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location = "",
  themeColor,
  temperature = "70°",
  description = "Clear skies",
  humidity = "45%",
  wind = "5 mph",
  feelsLike = "72°",
}) => {
  return (
    <BaseCard
      icon={<SunIcon />}
      title={location}
      subtitle="Current Weather"
      mainValue={<span className="text-4xl">{temperature}</span>}
      details={<span>{description}</span>}
      themeColor={themeColor}
    >
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-white text-xs">Humidity</p>
            <p className="text-white font-medium">{humidity}</p>
          </div>
          <div>
            <p className="text-white text-xs">Wind</p>
            <p className="text-white font-medium">{wind}</p>
          </div>
          <div>
            <p className="text-white text-xs">Feels Like</p>
            <p className="text-white font-medium">{feelsLike}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default WeatherCard; 