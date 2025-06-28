import React from 'react';
import { Calculator } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface MathCardProps {
  operation: string;
  result: string | number;
  expression?: string;
  themeColor: string;
}

export const MathCard: React.FC<MathCardProps> = ({
  operation,
  result,
  expression,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<Calculator className="w-12 h-12 text-yellow-200" />}
      title="Math Result"
      subtitle={`Operation: ${operation.replace(/_/g, ' ')}`}
      mainValue={<span className="text-4xl">{result}</span>}
      details={expression ? <span className="font-mono">{expression}</span> : undefined}
      themeColor={themeColor}
    >
      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="text-center">
          <p className="text-white/80 text-xs">Calculation Complete</p>
          <p className="text-white font-medium text-sm">✓ Result Verified</p>
        </div>
      </div>
    </BaseCard>
  );
}; 