import React from "react";
import { Globe, MapPin, Wifi } from "lucide-react";
import { BaseCard } from "./BaseCard";

export type IPCardProps = {
  ip: string;
  location?: string;
  isp?: string;
  themeColor: string;
};

const IPCard: React.FC<IPCardProps> = ({ ip, location, isp, themeColor }) => {
  return (
    <BaseCard
      icon={<Globe className="w-12 h-12 text-green-200" />}
      title="IP Address"
      subtitle="Network Information"
      mainValue={<span className="text-xl font-mono">{ip}</span>}
      themeColor={themeColor}
    >
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          {location && (
            <div>
              <MapPin className="w-4 h-4 text-white/80 mx-auto mb-1" />
              <p className="text-white/80 text-xs">Location</p>
              <p className="text-white font-medium text-sm">{location}</p>
            </div>
          )}
          {isp && (
            <div>
              <Wifi className="w-4 h-4 text-white/80 mx-auto mb-1" />
              <p className="text-white/80 text-xs">ISP</p>
              <p className="text-white font-medium text-sm">{isp}</p>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default IPCard; 