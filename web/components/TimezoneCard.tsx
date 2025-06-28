import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface TimezoneCardProps {
  timezone: string;
  time: string;
  location?: string;
  offset?: string;
  themeColor: string;
}

export const TimezoneCard: React.FC<TimezoneCardProps> = ({
  timezone,
  time,
  location,
  offset,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<Clock className="w-12 h-12 text-teal-200" />}
      title="Current Time"
      subtitle={timezone}
      mainValue={<span className="text-3xl font-mono">{time}</span>}
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
          {offset && (
            <div>
              <p className="text-white/80 text-xs">UTC Offset</p>
              <p className="text-white font-medium text-sm">{offset}</p>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}; 