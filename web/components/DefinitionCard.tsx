import React from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface DefinitionCardProps {
  word: string;
  partOfSpeech?: string;
  definition: string;
  example?: string;
  pronunciation?: string;
  themeColor: string;
}

export const DefinitionCard: React.FC<DefinitionCardProps> = ({
  word,
  partOfSpeech,
  definition,
  example,
  pronunciation,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<BookOpen className="w-12 h-12 text-purple-200" />}
      title={word}
      subtitle={partOfSpeech ? `(${partOfSpeech})` : 'Dictionary'}
      themeColor={themeColor}
    >
      {pronunciation && (
        <div className="mb-3 flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-white/80" />
          <span className="text-white/80 text-sm font-mono">{pronunciation}</span>
        </div>
      )}
      
      <div className="mt-4 space-y-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-white/80 text-xs mb-2">Definition:</p>
          <p className="text-white text-sm leading-relaxed">{definition}</p>
        </div>
        
        {example && (
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white/80 text-xs mb-2">Example:</p>
            <p className="text-white/90 text-sm italic leading-relaxed">"{example}"</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/30 text-center">
        <p className="text-white/70 text-xs">
          Dictionary definition provided
        </p>
      </div>
    </BaseCard>
  );
}; 