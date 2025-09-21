"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import type { AgentState } from "../types";

type Props = {
  state: AgentState;
  setState: (updater: AgentState | ((prev: AgentState) => AgentState)) => void;
};

export default function StartChatAction({ state, setState }: Props) {
  useCopilotAction({
    name: "startChat",
    description: "Start the chat session and show tool results area.",
    parameters: [],
    handler: () => {
      setState({
        ...state,
        chatStarted: true,
      });
    },
  });

  return null;
}


