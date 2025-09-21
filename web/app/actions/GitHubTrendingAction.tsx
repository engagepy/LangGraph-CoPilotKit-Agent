"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { GitHubCard } from "../../components/GitHubCard";

type Props = {
  themeColor: string;
};

export default function GitHubTrendingAction({ themeColor }: Props) {
  useCopilotAction({
    name: "get_trending_github_repos",
    description: "Display trending GitHub repositories.",
    parameters: [
      { name: "repos", type: "string", required: true },
      { name: "language", type: "string", required: false },
    ],
    render: ({ args }) => {
      let repoArray: any[] = [];
      try {
        repoArray = typeof args.repos === "string" ? JSON.parse(args.repos as string) : (args.repos as any[]);
      } catch (e) {
        repoArray = [{ name: args.repos, language: args.language }];
      }
      return <GitHubCard repos={repoArray} themeColor={themeColor} />;
    },
  });

  return null;
}


