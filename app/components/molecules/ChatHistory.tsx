import { useEffect, useRef } from "react";
import { ChatEntry, ChatMessage } from "../atoms/ChatMessage";

export const ChatHistory = ({
  history,
  response,
  waitingForResponse,
}: {
  history: ChatEntry[];
  response: string;
  waitingForResponse: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, history, ref]);

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        overflow: "scroll",
        flexDirection: "column",
      }}
    >
      {history.map((msg: ChatEntry, i: number) => (
        <ChatMessage key={i} message={msg} />
      ))}
      {(response || waitingForResponse) && (
        <ChatMessage
          message={{
            role: "assistant",
            content: response ? response : "...",
          }}
        />
      )}
      <div ref={ref} />
    </div>
  );
};
