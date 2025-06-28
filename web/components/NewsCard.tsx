import React from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import { BaseCard } from "./BaseCard";

export type NewsCardProps = {
  title: string;
  summary: string;
  source?: string;
  url?: string;
  themeColor: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ title, summary, source, url, themeColor }) => {
  return (
    <BaseCard
      icon={<Newspaper className="w-12 h-12 text-blue-200" />}
      title={title}
      subtitle={source ? `Source: ${source}` : "News Article"}
      themeColor={themeColor}
    >
      <div className="mt-3 mb-4">
        <p className="text-white/90 text-sm leading-relaxed">
          {summary.slice(0, 180)}...
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

export default NewsCard; 