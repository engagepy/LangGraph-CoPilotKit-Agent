import React from "react";
import { Globe, MapPin, Wifi } from "lucide-react";
import { BaseCard } from "./BaseCard";

export type IPCardProps = {
  ip: string;
  location?: string;
  isp?: string;
  themeColor: string;
  textColor?: string; // <- allow this for theming
};

const IPCard: React.FC<IPCardProps> = ({
  ip,
  location,
  isp,
  themeColor,
  textColor = "#fff", // default white if not specified
}) => {
  return (
    <BaseCard
      icon={<Globe className="w-12 h-12" style={{ color: textColor }} />}
      title="IP Address"
      subtitle="Network Information"
      mainValue={
        <span className="text-xl font-mono" style={{ color: textColor }}>
          {ip}
        </span>
      }
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
        <div className="grid grid-cols-2 gap-4 text-center">
          {location && (
            <div>
              <MapPin className="w-4 h-4 mx-auto mb-1" style={{ color: textColor }} />
              <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>Location</p>
              <p className="font-medium text-sm" style={{ color: textColor }}>{location}</p>
            </div>
          )}
          {isp && (
            <div>
              <Wifi className="w-4 h-4 mx-auto mb-1" style={{ color: textColor }} />
              <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>ISP</p>
              <p className="font-medium text-sm" style={{ color: textColor }}>{isp}</p>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default IPCard;