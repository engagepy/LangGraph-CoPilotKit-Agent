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
}

export const SearchCard: React.FC<SearchCardProps> = ({
  type,
  query,
  answer,
  results,
  themeColor
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
      mainValue={answer ? <span className="text-base leading-relaxed">{answer.slice(0, 120)}...</span> : undefined}
      themeColor={themeColor}
    >
      {results && results.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/30 space-y-3">
          {results.slice(0, 2).map((result, index) => (
            <div key={index} className="bg-white/10 p-3 rounded-lg">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-200 hover:underline font-medium text-sm block"
              >
                {result.title}
              </a>
              {result.content && (
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  {result.content.slice(0, 100)}...
                </p>
              )}
            </div>
          ))}
          {results.length > 2 && (
            <div className="text-center text-xs text-white/70">
              +{results.length - 2} more results
            </div>
          )}
        </div>
      )}
    </BaseCard>
  );
}; 