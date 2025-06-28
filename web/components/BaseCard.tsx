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
}

export const BaseCard: React.FC<BaseCardProps> = ({
  icon,
  title,
  subtitle,
  mainValue,
  details,
  themeColor,
  children,
  className = ""
}) => {
  return (
    <div
      style={{ backgroundColor: themeColor, borderRadius: '0.75rem' }}
      className={`shadow-xl mt-6 mb-4 max-w-md w-full overflow-hidden ${className}`}
    >
      <div className="bg-white/20 p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white capitalize">{title}</h3>
            {subtitle && <p className="text-white text-sm opacity-90">{subtitle}</p>}
          </div>
          {icon}
        </div>
        {mainValue && <div className="text-3xl font-bold text-white mb-2">{mainValue}</div>}
        {details && <div className="text-sm text-white opacity-90 mb-2">{details}</div>}
        {children}
      </div>
    </div>
  );
}; 