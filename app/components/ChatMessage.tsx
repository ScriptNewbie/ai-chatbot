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
    <div
      style={{
        padding: "8px",
        borderRadius: "8px",
        margin: "8px",
        backgroundColor:
          message.role === "user" ? "rgb(70,70,240)" : "rgb(30,30,30)",
        maxWidth: "70%",
        justifySelf: message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Markdown>{message.content}</Markdown>
      <div ref={ref} />
    </div>
  );
};
