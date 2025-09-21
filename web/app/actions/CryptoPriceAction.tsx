"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { CryptoCard } from "../../components/CryptoCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function CryptoPriceAction({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "get_crypto_price",
    description: "Display cryptocurrency price information.",
    parameters: [
      { name: "symbol", type: "string", required: true },
      { name: "price_usd", type: "string", required: true },
      { name: "change_24h", type: "string", required: false },
    ],
    render: ({ result, args }) => {
      const isFetching = !result;
      const hasNoData = !args.price_usd && !result?.price_usd;
      if (isFetching && hasNoData) {
        return (
          <div className="flex items-center justify-center p-8" style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1.5em", minHeight: "8em" }}>
            <span className="text-white/70 text-base">Fetching <b>{(args.symbol as string) || "crypto"}</b> price...</span>
          </div>
        );
      }
      return (
        <CryptoCard
          symbol={(result?.cryptocurrency as string) || (args.symbol as string)}
          price={(result?.price_usd as string) || (args.price_usd as string)}
          change24h={(result?.change_24h as string) || (args.change_24h as string)}
          themeColor={themeColor}
          textColor={textColor}
        />
      );
    },
  });

  return null;
}


