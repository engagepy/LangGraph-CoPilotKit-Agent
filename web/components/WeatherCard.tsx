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
  textColor?: string;
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
  temperature,
  description,
  humidity,
  wind,
  feelsLike,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<span style={{ color: textColor }}><SunIcon /></span>}
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
            <p className="font-medium" style={{ color: textColor }}>{wind || 'N/A'}</p>
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