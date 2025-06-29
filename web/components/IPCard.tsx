import React from "react";
import { Globe, MapPin, Wifi } from "lucide-react";
import { BaseCard } from "./BaseCard";

export type IPCardProps = {
  ip: string;
  location?: string;
  isp?: string;
  themeColor: string;
  textColor?: string;
};

const IPCard: React.FC<IPCardProps> = ({
  ip,
  location,
  isp,
  themeColor,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<Globe className="w-12 h-12" style={{ color: textColor, opacity: 0.9 }} />}
      title="IP Address"
      subtitle="Network Information"
      mainValue={
        <span className="text-xl font-mono" style={{ color: textColor }}>
          {ip || "Fetching..."}
        </span>
      }
      themeColor={themeColor}
      textColor={textColor}
    >
      {(location || isp) ? (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
          <div className="grid grid-cols-2 gap-4 text-center">
            {location && (
              <div>
                <MapPin className="w-4 h-4 mx-auto mb-1" style={{ color: textColor, opacity: 0.85 }} />
                <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>Location</p>
                <p className="font-medium text-sm" style={{ color: textColor }}>{location}</p>
              </div>
            )}
            {isp && (
              <div>
                <Wifi className="w-4 h-4 mx-auto mb-1" style={{ color: textColor, opacity: 0.85 }} />
                <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>ISP</p>
                <p className="font-medium text-sm" style={{ color: textColor }}>{isp}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t flex items-center justify-center" style={{ borderColor: textColor, opacity: 0.3 }}>
          <span className="text-sm" style={{ color: textColor, opacity: 0.7 }}>No location/ISP info available</span>
        </div>
      )}
    </BaseCard>
  );
};

export default IPCard;