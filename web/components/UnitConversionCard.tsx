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
}

export const UnitConversionCard: React.FC<UnitConversionCardProps> = ({
  fromValue,
  fromUnit,
  toValue,
  toUnit,
  type = 'general',
  themeColor
}) => {
  return (
    <BaseCard
      icon={<TrendingUp className="w-12 h-12 text-emerald-200" />}
      title="Unit Conversion"
      subtitle={type === 'land' ? 'Land Units' : 'General Units'}
      themeColor={themeColor}
    >
      <div className="mt-4 space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <div className="text-center space-y-3">
            <div>
              <p className="text-white/80 text-xs">From</p>
              <p className="text-white text-2xl font-bold">{fromValue}</p>
              <p className="text-white/90 text-sm">{fromUnit}</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-white/60 mx-auto" />
            
            <div>
              <p className="text-white/80 text-xs">To</p>
              <p className="text-white text-2xl font-bold">{toValue}</p>
              <p className="text-white/90 text-sm">{toUnit}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/80 text-xs">Conversion Formula</p>
          <p className="text-white/90 text-sm font-mono bg-white/10 p-2 rounded mt-1">
            {fromValue} {fromUnit} = {toValue} {toUnit}
          </p>
        </div>
      </div>
    </BaseCard>
  );
}; 