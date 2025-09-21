"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import MathCard from "../../components/MathCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function MathResultAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "math_result",
    description: "Display math calculation results.",
    parameters: [
      { name: "operation", type: "string", required: true },
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
      { name: "error", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      const isFetching = !result || Object.keys(result).length === 0;
      const hasNoData = !args.result && !result?.result;
      if (isFetching && hasNoData) {
        return (
          <div
            className="flex items-center justify-center p-8"
            style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1.5em", minHeight: "8em" }}
          >
            <span className="text-white/70 text-base">
              Calculating <b>{args.operation || "math"}</b>...
            </span>
          </div>
        );
      }

      const operation = result?.operation || args.operation;
      const mathResult = (result?.result ?? args.result) as string;
      const expression = (result?.expression ?? args.expression) as string | undefined;
      const a = (result?.a ?? args.a) as number | undefined;
      const b = (result?.b ?? args.b) as number | undefined;
      const error = (result?.error ?? args.error) as string | undefined;

      if (error) {
        return (
          <div
            className="flex flex-col items-center justify-center p-8"
            style={{ background: "rgba(255,0,0,0.04)", borderRadius: "1.5em", minHeight: "8em" }}
          >
            <span className="text-red-400 text-base font-bold">Math Error</span>
            <span className="text-red-300 text-sm mt-2">{error}</span>
          </div>
        );
      }

      return (
        <MathCard
          operation={operation}
          result={mathResult}
          expression={expression}
          a={a}
          b={b}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  return null;
}


