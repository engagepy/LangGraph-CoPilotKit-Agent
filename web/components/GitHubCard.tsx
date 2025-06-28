import React from 'react';
import { Github, Star } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface GitHubCardProps {
  repos: Array<{
    name: string;
    description?: string;
    language?: string;
    stars?: number;
    url?: string;
  }>;
  themeColor: string;
}

export const GitHubCard: React.FC<GitHubCardProps> = ({
  repos,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<Github className="w-12 h-12 text-gray-200" />}
      title="GitHub Trending"
      subtitle="Popular Repositories"
      mainValue={<span className="text-2xl">{repos.length} repos</span>}
      themeColor={themeColor}
    >
      <div className="mt-4 pt-4 border-t border-white/30 space-y-3">
        {repos.slice(0, 3).map((repo, index) => (
          <div key={index} className="bg-white/10 p-3 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-200 hover:underline font-semibold text-sm block"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    {repo.description.slice(0, 80)}...
                  </p>
                )}
              </div>
              {repo.stars && (
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-3 h-3 text-yellow-200" />
                  <span className="text-xs text-white">{repo.stars}</span>
                </div>
              )}
            </div>
            {repo.language && (
              <div className="mt-2">
                <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs text-white">
                  {repo.language}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </BaseCard>
  );
}; 