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
}

export const NASACard: React.FC<NASACardProps> = ({
  title,
  date,
  explanation,
  url,
  hdurl,
  mediaType,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<Rocket className="w-12 h-12 text-orange-200" />}
      title="NASA APOD"
      subtitle={title}
      mainValue={<span className="text-xl">{date}</span>}
      themeColor={themeColor}
    >
      {explanation && (
        <div className="mt-3 mb-4">
          <p className="text-white/90 text-sm leading-relaxed">
            {explanation.slice(0, 150)}...
          </p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="grid grid-cols-2 gap-2">
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
            >
              <Image className="w-4 h-4 text-white" />
              <span className="text-white text-xs">View Image</span>
            </a>
          )}
          {hdurl && (
            <a 
              href={hdurl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
            >
              <ExternalLink className="w-4 h-4 text-white" />
              <span className="text-white text-xs">HD Version</span>
            </a>
          )}
        </div>
        {mediaType && (
          <div className="mt-2 text-center">
            <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs text-white">
              {mediaType.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </BaseCard>
  );
}; 