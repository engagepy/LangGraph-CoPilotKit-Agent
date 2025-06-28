import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface CryptoCardProps {
  symbol: string;
  price: string | number;
  change24h?: string | number;
  themeColor: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  symbol,
  price,
  change24h,
  themeColor
}) => {
  const changeValue = change24h ? parseFloat(change24h.toString()) : 0;
  const isPositive = changeValue >= 0;
  
  return (
    <BaseCard
      icon={<DollarSign className="w-12 h-12 text-green-200" />}
      title={symbol.toUpperCase()}
      subtitle="Cryptocurrency"
      mainValue={<span className="text-4xl">${price}</span>}
      themeColor={themeColor}
    >
      {change24h && (
        <div className="mt-4 pt-4 border-t border-white/30">
          <div className="flex items-center justify-center space-x-2">
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-200" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-200" />
            )}
            <span className={`font-bold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
              {isPositive ? '+' : ''}{change24h}%
            </span>
            <span className="text-white/80 text-sm">24h</span>
          </div>
        </div>
      )}
    </BaseCard>
  );
}; 