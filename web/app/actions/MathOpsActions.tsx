"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import MathCard from "../../components/MathCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function MathOpsActions({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "add",
    description: "Use for add operatons only. Display addition results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="add" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  useCopilotAction({
    name: "multiply",
    description: "Use for multiply operatons only. Display multiplication results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="multiply" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  useCopilotAction({
    name: "divide",
    description: "Use for divide operatons only. Display division results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="divide" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  useCopilotAction({
    name: "subtract",
    description: "Use for subtract operatons only. Display subtraction results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="subtract" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  useCopilotAction({
    name: "power",
    description: "Use for power operatons only. Display power results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="power" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  useCopilotAction({
    name: "modulo",
    description: "Use for modulo operatons only. Display modulo results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "expression", type: "string", required: false },
      { name: "a", type: "number", required: false },
      { name: "b", type: "number", required: false },
    ],
    render: ({ result }) => (
      <MathCard operation="modulo" result={result?.result as string} expression={result?.expression as string} a={result?.a} b={result?.b} themeColor={themeColor} textColor={textColor} />
    ),
  });

  return null;
}


