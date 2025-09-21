"use client";
import { useCopilotAction } from "@copilotkit/react-core";

type Props = {
  onSetThemeColor: (color: string) => void;
};

export default function SetThemeColorAction({ onSetThemeColor }: Props) {
  useCopilotAction({
    name: "setThemeColor",
    parameters: [
      {
        name: "themeColor",
        description: "The theme color to set. Make sure to pick nice colors.",
        required: true,
      },
    ],
    handler({ themeColor }) {
      onSetThemeColor(themeColor);
    },
  });

  return null;
}


