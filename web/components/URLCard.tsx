import React, { useState } from 'react';
import { Link, Copy, Check, ExternalLink } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface URLCardProps {
  originalUrl?: string;
  shortUrl: string;
  themeColor: string;
}

export const URLCard: React.FC<URLCardProps> = ({
  originalUrl,
  shortUrl,
  themeColor
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <BaseCard
      icon={<Link className="w-12 h-12 text-cyan-200" />}
      title="URL Shortened"
      subtitle="Link Ready to Share"
      themeColor={themeColor}
    >
      <div className="mt-4 space-y-3">
        {originalUrl && (
          <div>
            <p className="text-white/80 text-xs mb-1">Original URL:</p>
            <p className="text-white text-sm font-mono break-all bg-white/10 p-2 rounded">
              {originalUrl.slice(0, 60)}{originalUrl.length > 60 ? '...' : ''}
            </p>
          </div>
        )}
        
        <div>
          <p className="text-white/80 text-xs mb-1">Short URL:</p>
          <div className="flex items-center space-x-2 bg-white/10 p-2 rounded">
            <p className="text-white text-sm font-mono flex-1 break-all">
              {shortUrl}
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-200" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/30">
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
        >
          <ExternalLink className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Test Short URL</span>
        </a>
      </div>
    </BaseCard>
  );
}; 