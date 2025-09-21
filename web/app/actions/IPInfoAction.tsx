"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import IPCard from "../../components/IPCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function IPInfoAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "get_ip_info",
    description: "Display IP information in a card.",
    parameters: [
      { name: "ip", type: "string", required: true },
      { name: "location", type: "string", required: false },
      { name: "isp", type: "string", required: false },
    ],
    render: ({ result }) => {
      return (
        <IPCard
          ip={result?.ip as string}
          location={result?.location}
          isp={result?.isp}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  return null;
}


