import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface CryptoCardProps {
  symbol: string;
  price: string | number;
  change24h?: string | number;
  themeColor: string;
  textColor?: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  symbol,
  price,
  change24h,
  themeColor,
  textColor = "#fff",
}) => {
  const changeValue = change24h ? parseFloat(change24h.toString()) : 0;
  const isPositive = changeValue >= 0;
  
  return (
    <BaseCard
      icon={<span style={{ color: textColor }}><DollarSign className="w-12 h-12" /></span>}
      title={symbol?.toUpperCase() || 'UNKNOWN'}
      subtitle="Cryptocurrency"
      mainValue={<span className="text-4xl" style={{ color: textColor }}>${price}</span>}
      themeColor={themeColor}
      textColor={textColor}
    >
      {change24h && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
          <div className="flex items-center justify-center space-x-2">
            {isPositive ? (
              <span style={{ color: textColor }}><TrendingUp className="w-5 h-5" /></span>
            ) : (
              <span style={{ color: textColor }}><TrendingDown className="w-5 h-5" /></span>
            )}
            <span className="font-bold" style={{ color: textColor }}>
              {isPositive ? '+' : ''}{change24h}%
            </span>
            <span className="text-sm" style={{ color: textColor, opacity: 0.8 }}>24h</span>
          </div>
        </div>
      )}
    </BaseCard>
  );
}; 