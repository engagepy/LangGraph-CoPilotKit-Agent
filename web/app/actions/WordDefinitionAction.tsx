"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { DefinitionCard } from "../../components/DefinitionCard";

type Props = {
  themeColor: string;
};

export default function WordDefinitionAction({ themeColor }: Props) {
  useCopilotAction({
    name: "get_word_definition",
    description: "Display word definition.",
    parameters: [
      { name: "word", type: "string", required: true },
      { name: "definition", type: "string", required: true },
      { name: "part_of_speech", type: "string", required: false },
      { name: "example", type: "string", required: false },
    ],
    render: ({ args }) => (
      <DefinitionCard
        word={args.word as string}
        definition={args.definition as string}
        partOfSpeech={args.part_of_speech as string}
        example={args.example as string}
        themeColor={themeColor}
      />
    ),
  });
  return null;
}


