import React from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import { BaseCard } from "./BaseCard";

export type NewsCardProps = {
  title?: string;
  summary?: string;
  source?: string;
  url?: string;
  themeColor: string;
  textColor?: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  title = "Untitled News",
  summary = "No summary available.",
  source,
  url,
  themeColor,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<Newspaper className="w-12 h-12" style={{ color: textColor, opacity: 0.9 }} />}
      title={title}
      subtitle={source ? `Source: ${source}` : "News Article"}
      mainValue={null}
      details={
        <p
          className="text-base"
          style={{
            color: textColor,
            opacity: 0.92,
            marginBottom: '0.5em',
            lineHeight: '1.5',
          }}>
          {summary?.length > 200 ? summary.slice(0, 200) + "..." : summary}
        </p>
      }
      themeColor={themeColor}
      textColor={textColor}
    >
      {url && (
        <div className="mt-4 pt-4 border-t flex items-center justify-center"
          style={{ borderColor: textColor, opacity: 0.3 }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-lg"
            style={{ color: textColor, textDecoration: "underline", fontWeight: 500 }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Read Full Article</span>
          </a>
        </div>
      )}
    </BaseCard>
  );
};

export default NewsCard;