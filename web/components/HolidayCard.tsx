import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface HolidayCardProps {
  country: string;
  holidays?: Array<{
    name: string;
    date: string;
    type?: string;
  }>;
  themeColor: string;
}

export const HolidayCard: React.FC<HolidayCardProps> = ({
  country,
  holidays = [],
  themeColor
}) => {
  // Ensure holidays is always an array
  const safeHolidays = holidays || [];
  
  return (
    <BaseCard
      icon={<Calendar className="w-12 h-12 text-purple-200" />}
      title="Public Holidays"
      subtitle={country}
      mainValue={<span className="text-2xl">Holidays</span>}
      themeColor={themeColor}
    >
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="space-y-3">
          {safeHolidays.slice(0, 4).map((holiday, index) => (
            <div key={index} className="bg-white/10 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm">{holiday.name}</h4>
                  <p className="text-white/80 text-xs mt-1">{holiday.date}</p>
                </div>
                {holiday.type && (
                  <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs text-white ml-2">
                    {holiday.type}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {safeHolidays.length > 4 && (
            <div className="text-center text-xs text-white/70 bg-white/5 p-2 rounded">
              +{safeHolidays.length - 4} more holidays this year
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-2 text-white/80">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Holidays for {country}</span>
        </div>
      </div>
    </BaseCard>
  );
}; 