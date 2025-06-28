import React from 'react';
import { Rocket, ExternalLink, Image } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface NASACardProps {
  title: string;
  date: string;
  explanation?: string;
  url?: string;
  hdurl?: string;
  mediaType?: string;
  themeColor: string;
  textColor?: string;
}

export const NASACard: React.FC<NASACardProps> = ({
  title,
  date,
  explanation,
  url,
  hdurl,
  mediaType,
  themeColor,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<span style={{ color: textColor }}><Rocket className="w-12 h-12" /></span>}
      title="NASA APOD"
      subtitle={title}
      mainValue={<span className="text-xl" style={{ color: textColor }}>{date}</span>}
      themeColor={themeColor}
      textColor={textColor}
    >
      {explanation && (
        <div className="mt-3 mb-4">
          <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.9 }}>
            {explanation.slice(0, 150)}...
          </p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
        <div className="grid grid-cols-2 gap-2">
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 transition-colors p-2 rounded-lg"
              style={{ background: textColor + '20' }}
            >
              <span style={{ color: textColor }}><Image className="w-4 h-4" /></span>
              <span className="text-xs" style={{ color: textColor }}>View Image</span>
            </a>
          )}
          {hdurl && (
            <a 
              href={hdurl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 transition-colors p-2 rounded-lg"
              style={{ background: textColor + '20' }}
            >
              <span style={{ color: textColor }}><ExternalLink className="w-4 h-4" /></span>
              <span className="text-xs" style={{ color: textColor }}>HD Version</span>
            </a>
          )}
        </div>
        {mediaType && (
          <div className="mt-2 text-center">
            <span className="inline-block px-2 py-1 rounded text-xs" style={{ background: textColor + '20', color: textColor }}>
              {mediaType.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </BaseCard>
  );
}; 