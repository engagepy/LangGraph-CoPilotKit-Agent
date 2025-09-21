"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { SearchCard } from "../../components/SearchCard";

type Props = {
  themeColor: string;
  textColor: string;
};

export default function SearchActions({ themeColor, textColor }: Props) {
  useCopilotAction({
    name: "search_news",
    description: "Display news/web search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true },
    ],
    render: ({ result, args }) => {
      const query = (result?.query as string) || (args?.query as string) || "";
      const answer = (result?.answer as string) || (args?.answer as string) || "";
      let resultsArr: any[] = [];
      try {
        resultsArr = typeof result?.results === "string" ? JSON.parse(result.results as string) : (result?.results as any[]) || [];
      } catch {
        resultsArr = [];
      }
      return <SearchCard type={result?.name === "web_search" ? "web" : "news"} query={query} answer={answer} results={resultsArr} themeColor={themeColor} textColor={textColor} />;
    },
  });

  useCopilotAction({
    name: "web_search",
    description: "Display news/web search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true },
    ],
    render: ({ result, args }) => {
      const query = (result?.query as string) || (args?.query as string) || "";
      const answer = (result?.answer as string) || (args?.answer as string) || "";
      let resultsArr: any[] = [];
      try {
        resultsArr = typeof result?.results === "string" ? JSON.parse(result.results as string) : (result?.results as any[]) || [];
      } catch {
        resultsArr = [];
      }
      return <SearchCard type="web" query={query} answer={answer} results={resultsArr} themeColor={themeColor} textColor={textColor} />;
    },
  });

  useCopilotAction({
    name: "search_academic",
    description: "Display academic search results.",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "answer", type: "string", required: false },
      { name: "results", type: "string", required: true },
    ],
    render: ({ result }) => {
      let results: any = undefined;
      try {
        results = typeof result.results === "string" ? JSON.parse(result.results as string) : result.results;
      } catch (e) {
        results = result.results;
      }
      return <SearchCard type="academic" query={result.query as string} answer={result.results as string} results={Array.isArray(results) ? results : results ? [results] : undefined} themeColor={themeColor} textColor={textColor} />;
    },
  });

  return null;
}


