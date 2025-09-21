"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { UnitConversionCard } from "../../components/UnitConversionCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function LandUnitConversionAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "convert_land_unit",
    description: "Display land unit conversion results.",
    parameters: [
      { name: "result", type: "string", required: true },
      { name: "from_unit", type: "string", required: true },
      { name: "to_unit", type: "string", required: true },
      { name: "original_value", type: "string", required: false },
    ],
    render: ({ result }) => {
      return (
        <UnitConversionCard
          fromValue={(result?.value as string) || "1"}
          fromUnit={result?.from as string}
          toValue={result?.result as string}
          toUnit={result?.to as string}
          type="land"
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });
  return null;
}


