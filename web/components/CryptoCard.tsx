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
  // Normalise and check change
  const changeValue = typeof change24h === 'string' ? parseFloat(change24h) : Number(change24h ?? 0);
  const isPositive = changeValue >= 0;

  return (
    <BaseCard
      icon={
        <span style={{ color: textColor }}>
          <DollarSign className="w-12 h-12" />
        </span>
      }
      title={symbol?.toUpperCase() || "UNKNOWN"}
      subtitle="Cryptocurrency"
      mainValue={
        <span className="text-4xl" style={{ color: textColor }}>
          {typeof price === "number" ? `$${price.toFixed(2)}` : `${price || "N/A"}`}
        </span>
      }
      details={
        <span style={{ color: textColor, opacity: 0.85 }}>
          {change24h !== undefined && change24h !== null
            ? `${isPositive ? "Up" : "Down"} ${Math.abs(changeValue)}% (24h)`
            : "No recent change data"}
        </span>
      }
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 pt-4 border-t flex items-center justify-center gap-3"
        style={{ borderColor: textColor, opacity: 0.3 }}>
        {change24h !== undefined && change24h !== null ? (
          <>
            <span style={{ color: isPositive ? "#7cff97" : "#ff7676" }}>
              {isPositive
                ? <TrendingUp className="w-5 h-5" />
                : <TrendingDown className="w-5 h-5" />}
            </span>
            <span className="font-bold" style={{ color: textColor }}>
              {isPositive ? "+" : ""}{changeValue}%
            </span>
            <span className="text-sm" style={{ color: textColor, opacity: 0.7 }}>24h</span>
          </>
        ) : (
          <span className="text-sm" style={{ color: textColor, opacity: 0.5 }}>No 24h change info</span>
        )}
      </div>
    </BaseCard>
  );
};