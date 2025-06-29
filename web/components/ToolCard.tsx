"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import "../app/globals.css";

export interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  mainValue?: React.ReactNode;
  details?: React.ReactNode;
  themeColor: string;
  prompts?: string[];
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  title,
  subtitle,
  mainValue,
  details,
  themeColor,
  prompts = [],
}) => {
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Flip and cycle prompts every 5 seconds
  useEffect(() => {
    if (!prompts || prompts.length === 0) return;
    intervalRef.current = setInterval(() => {
      setFlipped(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % prompts.length);
        setFlipped(false);
      }, 650); // Match flip duration
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [prompts]);

  // Manual flip (if you want click-to-flip as well)
  const handlePromptFlip = () => {
    if (!prompts || prompts.length === 0) return;
    setFlipped(true);
    setTimeout(() => {
      setIdx(i => (i + 1) % prompts.length);
      setFlipped(false);
    }, 650);
    // Remove clipboard if you don't want auto-copy
    if (prompts[idx]) {
      navigator.clipboard.writeText(prompts[idx]);
    }
  };

  return (
    <div
      className={`flip-card relative w-full h-[220px] my-2 ${flipped ? "flipped" : ""}`}
      style={{ minWidth: 270, maxWidth: 400 }}
    >
      <div className="flip-card-inner">
        {/* Front Side */}
        <div
          className="flip-card-front bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center"
          style={{
            background: themeColor + "22",
            color: "#222",
            minHeight: 200,
          }}
        >
          <div className="text-4xl mb-2">{icon}</div>
          <div className="text-2xl font-black mb-1">{title}</div>
          <div className="text-base opacity-80 mb-3">{subtitle}</div>
          {mainValue && <div className="text-2xl mb-2">{mainValue}</div>}
          {details && <div className="text-sm opacity-90 mb-3">{details}</div>}
          {prompts && prompts.length > 0 && (
            <div className="flex flex-col items-center justify-center mt-3">
              <span className="text-center text-base font-mono px-2 py-1 bg-black/40 rounded text-white shadow">
                {prompts[idx]}
              </span>
              <button
                onClick={handlePromptFlip}
                className="text-white/70 hover:text-white text-lg mt-2"
                style={{ background: "transparent" }}
                type="button"
                aria-label="Next Example Prompt"
              >
                <ArrowRight className="inline w-6 h-6" />
              </button>
            </div>
          )}
        </div>
        {/* Back Side */}
        <div
          className="flip-card-back bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center"
          style={{
            background: themeColor + "66",
            color: "#111",
            minHeight: 200,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-lg font-semibold mb-1">Try This Prompt:</span>
            <span className="text-center text-base font-mono px-2 py-1 bg-white/80 rounded text-black shadow">
              {prompts[idx] || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;