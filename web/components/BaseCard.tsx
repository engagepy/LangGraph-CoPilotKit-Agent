import React from 'react';

export interface BaseCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  mainValue?: React.ReactNode;
  details?: React.ReactNode;
  themeColor: string;
  children?: React.ReactNode;
  className?: string;
  textColor?: string;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  icon,
  title,
  subtitle,
  mainValue,
  details,
  themeColor,
  children,
  className = "",
  textColor = "#fff",
}) => {
  return (
    <div
      style={{ backgroundColor: themeColor, borderRadius: '0.75rem', color: textColor }}
      className={`shadow-xl mt-6 mb-4 max-w-md w-full overflow-hidden ${className}`}
    >
      <div className="p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold capitalize" style={{ color: textColor }}>{title}</h3>
            {subtitle && <p className="text-sm opacity-90" style={{ color: textColor, opacity: 0.9 }}>{subtitle}</p>}
          </div>
          {icon}
        </div>
        {mainValue && <div className="text-3xl font-bold mb-2" style={{ color: textColor }}>{mainValue}</div>}
        {details && <div className="text-sm opacity-90 mb-2" style={{ color: textColor, opacity: 0.9 }}>{details}</div>}
        {children}
      </div>
    </div>
  );
}; 