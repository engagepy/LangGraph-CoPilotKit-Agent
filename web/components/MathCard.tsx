import React from 'react';
import { Calculator } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface MathCardProps {
  operation: string;
  result: string | number;
  expression?: string;
  themeColor: string;
  textColor?: string;
}

export const MathCard: React.FC<MathCardProps> = ({
  operation,
  result,
  expression,
  themeColor,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<span style={{ color: textColor }}><Calculator className="w-12 h-12" /></span>}
      title="Math Result"
      subtitle={`Operation: ${operation.replace(/_/g, ' ')}`}
      mainValue={<span className="text-4xl" style={{ color: textColor }}>{result}</span>}
      details={expression ? <span className="font-mono" style={{ color: textColor }}>{expression}</span> : undefined}
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 pt-4 border-t" style={{ borderColor: textColor, opacity: 0.3 }}>
        <div className="text-center">
          <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>Calculation Complete</p>
          <p className="font-medium text-sm" style={{ color: textColor }}>✓ Result Verified</p>
        </div>
      </div>
    </BaseCard>
  );
}; 