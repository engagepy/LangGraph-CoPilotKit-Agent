"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { NASACard } from "../../components/NASACard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function NASAAPODAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "get_nasa_apod",
    description: "Display NASA Astronomy Picture of the Day.",
    parameters: [
      { name: "title", type: "string", required: true },
      { name: "date", type: "string", required: true },
      { name: "url", type: "string", required: false },
      { name: "explanation", type: "string", required: false },
    ],
    render: ({ args }) => {
      return (
        <NASACard
          title={args.title as string}
          date={args.date as string}
          url={args.url as string}
          explanation={args.explanation as string}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  return null;
}


