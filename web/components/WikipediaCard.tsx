import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface WikipediaCardProps {
  title: string;
  summary: string;
  url?: string;
  themeColor: string;
}

export const WikipediaCard: React.FC<WikipediaCardProps> = ({
  title,
  summary,
  url,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<BookOpen className="w-12 h-12 text-indigo-200" />}
      title={title}
      subtitle="Wikipedia Summary"
      themeColor={themeColor}
    >
      <div className="mt-3 mb-4">
        <p className="text-white/90 text-sm leading-relaxed">
          {summary.slice(0, 200)}...
        </p>
      </div>
      
      {url && (
        <div className="mt-4 pt-4 border-t border-white/30">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
          >
            <ExternalLink className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Read Full Article</span>
          </a>
        </div>
      )}
    </BaseCard>
  );
}; 