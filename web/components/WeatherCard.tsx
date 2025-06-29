import React from "react";
import { BaseCard } from "./BaseCard";

export type WeatherCardProps = {
  location?: string;
  themeColor: string;
  temperature?: string;
  description?: string;
  humidity?: string;
  wind_speed?: string;
  feelsLike?: string;
  textColor?: string;
  isDay?: boolean;
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

const WeatherCard: React.FC<WeatherCardProps> = ({
  location = "",
  themeColor,
  temperature,
  description,
  humidity,
  wind_speed,
  feelsLike,
  textColor = "#fff",
  isDay = true,
}) => {
  return (
    <BaseCard
      icon={<span style={{ color: textColor }}>{isDay ? <SunIcon /> : <MoonIcon />}</span>}
      title={location || "Unknown Location"}
      subtitle="Current Weather"
      mainValue={<span className="text-4xl" style={{ color: textColor }}>{temperature || 'N/A'}</span>}
      details={<span style={{ color: textColor }}>{description || 'N/A'}</span>}
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs" style={{ color: textColor }}>Humidity</p>
            <p className="font-medium" style={{ color: textColor }}>{humidity || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: textColor }}>Wind</p>
            <p className="font-medium" style={{ color: textColor }}>{wind_speed || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: textColor }}>Feels Like</p>
            <p className="font-medium" style={{ color: textColor }}>{feelsLike || 'N/A'}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default WeatherCard; 