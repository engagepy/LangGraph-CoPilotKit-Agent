import React from "react";
import { Calculator } from "lucide-react";
import { BaseCard } from "./BaseCard";

export interface MathCardProps {
  operation: string;
  result: string | number;
  expression?: string;
  a?: string | number;
  b?: string | number;
  themeColor: string;
  textColor?: string;
}

const operationLabels: Record<string, string> = {
  add: "Addition",
  multiply: "Multiplication",
  divide: "Division",
  subtract: "Subtraction",
  power: "Exponentiation",
  modulo: "Modulo",
  floor_divide: "Floor Division",
};

const MathCard: React.FC<MathCardProps> = ({
  operation,
  result,
  expression,
  a,
  b,
  themeColor,
  textColor = "#fff",
}) => {
  // Prevent SSR/client mismatch by only rendering on client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const opLabel = operationLabels[operation?.toLowerCase()] || operation;
  return (
    <BaseCard
      icon={<Calculator className="w-12 h-12" style={{ color: textColor }} />}
      title="Math Result"
      subtitle={`Operation: ${opLabel}`}
      themeColor={themeColor}
      textColor={textColor}
      mainValue={
        <div className="flex flex-col items-start gap-1">
          {typeof a !== "undefined" && typeof b !== "undefined" && (
            <span className="font-mono text-base" style={{ color: textColor, opacity: 0.8 }}>
              Inputs: a = {a}, b = {b}
            </span>
          )}
          {expression && (
            <span className="font-mono text-2xl font-bold" style={{ color: textColor }}>
              {expression}
            </span>
          )}
          {!expression && (
            <span className="font-mono text-2xl font-bold" style={{ color: textColor }}>
              {result}
            </span>
          )}
        </div>
      }
      details={
        <div className="text-center">
          <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>
            Calculation Complete
          </p>
          <p className="font-medium text-sm" style={{ color: textColor }}>
            ✓ Result Verified
          </p>
        </div>
      }
    />
  );
};

export default MathCard;