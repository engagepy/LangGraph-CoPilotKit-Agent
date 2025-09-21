"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { WikipediaCard } from "../../components/WikipediaCard";

type Props = {
  themeColor: string;
};

export default function WikipediaSummaryAction({ themeColor }: Props) {
  useCopilotAction({
    name: "get_wikipedia_summary",
    description: "Display Wikipedia summary.",
    parameters: [
      { name: "title", type: "string", required: true },
      { name: "summary", type: "string", required: true },
      { name: "url", type: "string", required: false },
    ],
    render: ({ args }) => {
      return <WikipediaCard title={args.title as string} summary={args.summary as string} url={args.url as string} themeColor={themeColor} />;
    },
  });

  return null;
}


