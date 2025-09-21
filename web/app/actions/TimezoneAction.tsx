"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { TimezoneCard } from "../../components/TimezoneCard";

type Props = {
  themeColor: string;
};

export default function TimezoneAction({ themeColor }: Props) {
  useCopilotAction({
    name: "get_current_timezone",
    description: "Display timezone information.",
    parameters: [
      { name: "timezone", type: "string", required: true },
      { name: "time", type: "string", required: true },
      { name: "location", type: "string", required: false },
    ],
    render: ({ args }) => (
      <TimezoneCard timezone={args.timezone as string} time={args.time as string} location={args.location as string} themeColor={themeColor} />
    ),
  });
  return null;
}


