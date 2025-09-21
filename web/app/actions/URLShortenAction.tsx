"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { URLCard } from "../../components/URLCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function URLShortenAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "shorten_url",
    description: "Display shortened URL.",
    parameters: [
      { name: "short_url", type: "string", required: true },
      { name: "original_url", type: "string", required: false },
    ],
    render: ({ result }) => (
      <URLCard
        shortUrl={result?.short_url as string}
        originalUrl={result?.original_url as string}
        themeColor={themeColor}
        textColor={textColor}
      />
    ),
  });
  return null;
}


