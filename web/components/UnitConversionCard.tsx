import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface UnitConversionCardProps {
  fromValue: string | number;
  fromUnit: string;
  toValue: string | number;
  toUnit: string;
  type?: 'general' | 'land';
  themeColor: string;
  textColor?: string; // <- add this!
}

export const UnitConversionCard: React.FC<UnitConversionCardProps> = ({
  fromValue,
  fromUnit,
  toValue,
  toUnit,
  type = 'general',
  themeColor,
  textColor = "#fff", // default to white
}) => {
  return (
    <BaseCard
      icon={<TrendingUp className="w-12 h-12 text-emerald-200" />}
      title="Unit Conversion"
      subtitle={type === 'land' ? 'Land Units' : 'General Units'}
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <div className="text-center space-y-3">
            <div>
              <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>From</p>
              <p className="text-2xl font-bold" style={{ color: textColor }}>{fromValue}</p>
              <p className="text-sm" style={{ color: textColor, opacity: 0.9 }}>{fromUnit}</p>
            </div>
            <ArrowRight className="w-6 h-6" style={{ color: textColor, opacity: 0.6 }} />
            <div>
              <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>To</p>
              <p className="text-2xl font-bold" style={{ color: textColor }}>{toValue}</p>
              <p className="text-sm" style={{ color: textColor, opacity: 0.9 }}>{toUnit}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>Result</p>
          <p className="text-sm font-mono bg-white/10 p-2 rounded mt-1" style={{ color: textColor, opacity: 0.9 }}>
            {fromValue} {fromUnit} = {toValue} {toUnit}
          </p>
        </div>
      </div>
    </BaseCard>
  );
};