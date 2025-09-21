"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { HolidayCard } from "../../components/HolidayCard";

type Props = {
  themeColor: string;
};

export default function PublicHolidaysAction({ themeColor }: Props) {
  useCopilotAction({
    name: "get_public_holidays",
    description: "Display public holidays information.",
    parameters: [
      { name: "country", type: "string", required: true },
      { name: "holidays", type: "string", required: true },
    ],
    render: ({ args }) => {
      let holidayArray: any[] = [];
      try {
        if (args.holidays) {
          const parsed = typeof args.holidays === "string" ? JSON.parse(args.holidays as string) : args.holidays;
          holidayArray = Array.isArray(parsed) ? parsed : [{ name: String(args.holidays), date: "Date not specified" }];
        }
      } catch (e) {
        holidayArray = args.holidays ? [{ name: String(args.holidays), date: "Date not specified" }] : [];
      }

      return <HolidayCard country={args.country as string} holidays={holidayArray} themeColor={themeColor} />;
    },
  });
  return null;
}


