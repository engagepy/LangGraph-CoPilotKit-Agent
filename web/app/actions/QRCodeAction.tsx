"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import QRCodeCard from "../../components/QRCodeCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function QRCodeAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "generate_qr_code",
    description: "Display generated QR code.",
    parameters: [
      { name: "qr_code_url", type: "string", required: true },
      { name: "content", type: "string", required: false },
    ],
    render: ({ result }) => (
      <QRCodeCard
        qrCodeUrl={result?.qr_code_url as string}
        data={result?.content as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    ),
  });
  return null;
}


