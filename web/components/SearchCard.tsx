import React from 'react';
import { Search, Globe, Newspaper, GraduationCap } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface SearchCardProps {
  type: 'web' | 'news' | 'academic';
  query: string;
  answer?: string;
  results?: Array<{
    title: string;
    url: string;
    content?: string;
  }>;
  themeColor: string;
  textColor?: string;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  type,
  query,
  answer,
  results,
  themeColor,
  textColor = "#fff"
}) => {
  const getIcon = () => {
    switch (type) {
      case 'news': return <Newspaper className="w-12 h-12 text-blue-200" />;
      case 'academic': return <GraduationCap className="w-12 h-12 text-purple-200" />;
      default: return <Globe className="w-12 h-12 text-blue-200" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'news': return 'News Search';
      case 'academic': return 'Academic Search';
      default: return 'Web Search';
    }
  };

  return (
    <BaseCard
      icon={getIcon()}
      title={getTypeLabel()}
      subtitle={query}
      mainValue={answer ? <span className="text-base leading-relaxed" style={{ color: textColor }}>{answer.slice(0, 120)}...</span> : undefined}
      themeColor={themeColor}
      textColor={textColor}
    >
      {results && results.length > 0 ? (
        <div className="mt-4 pt-4 border-t space-y-3 max-h-72 overflow-y-auto custom-scrollbar" style={{ borderColor: textColor }}>
          {results.map((result, index) => (
            <div key={index} className="bg-white/10 p-3 rounded-lg">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-200 hover:underline font-medium text-sm block"
                style={{ color: textColor }}
              >
                {result.title}
              </a>
              {result.content && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                  {result.content.slice(0, 100)}...
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t flex items-center justify-center min-h-[4rem]" style={{ borderColor: textColor, opacity: 0.3 }}>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: textColor, animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: textColor, animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: textColor, animationDelay: '300ms' }}></div>
            </div>
            <span className="text-base" style={{ color: textColor, opacity: 0.7 }}>Loading...</span>
          </div>
        </div>
      )}
    </BaseCard>
  );
};