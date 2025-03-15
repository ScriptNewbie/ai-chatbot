import { RefObject } from "react";
import Markdown from "react-markdown";

export interface ChatEntry {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({
  message,
  ref,
}: {
  message: ChatEntry;
  ref?: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <>
      <Markdown>
        {(message.role === "user" ? "You: " : "Jack: ") + message.content}
      </Markdown>
      <div ref={ref} />
    </>
  );
};
