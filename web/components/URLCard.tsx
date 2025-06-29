import React, { useState } from 'react';
import { Link as LinkIcon, Copy, Check, ExternalLink } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface URLCardProps {
  originalUrl?: string;
  shortUrl: string;
  themeColor: string;
  textColor?: string;
}

export const URLCard: React.FC<URLCardProps> = ({
  originalUrl,
  shortUrl,
  themeColor,
  textColor = "#fff",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <BaseCard
      icon={<LinkIcon className="w-12 h-12" style={{ color: textColor, opacity: 0.9 }} />}
      title="URL Shortened"
      subtitle="Link Ready to Share"
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 space-y-3">
        {originalUrl && (
          <div>
            <p className="text-xs mb-1" style={{ color: textColor, opacity: 0.7 }}>Original URL:</p>
            <p className="text-sm font-mono break-all bg-white/10 p-2 rounded"
              style={{ color: textColor, opacity: 0.92 }}>
              {originalUrl.slice(0, 60)}{originalUrl.length > 60 ? '...' : ''}
            </p>
          </div>
        )}

        <div>
          <p className="text-xs mb-1" style={{ color: textColor, opacity: 0.7 }}>Short URL:</p>
          <div className="flex items-center space-x-2 bg-white/10 p-2 rounded">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 break-all font-mono text-sm hover:underline"
              style={{ color: textColor, opacity: 0.95 }}
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" style={{ color: "#7cff97" }} />
              ) : (
                <Copy className="w-4 h-4" style={{ color: textColor }} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex items-center justify-center"
        style={{ borderColor: textColor, opacity: 0.3 }}>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
          style={{ color: textColor, textDecoration: "underline", fontWeight: 500 }}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Short URL</span>
        </a>
      </div>
    </BaseCard>
  );
};

export default URLCard;