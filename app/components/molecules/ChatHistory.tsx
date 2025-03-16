import { useEffect, useRef } from "react";
import { ChatEntry, ChatMessage } from "../atoms/ChatMessage";
import { useSearchParams } from "next/navigation";

export const ChatHistory = ({
  history,
  response,
  waitingForResponse,
}: {
  history: ChatEntry[];
  response: string;
  waitingForResponse: boolean;
}) => {
  const params = useSearchParams();
  const langParam = params.get("lang") || "eng";
  const lang = (
    langParam in textsMap ? langParam : "eng"
  ) as keyof typeof textsMap;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, history, ref]);

  if (history.length === 0) {
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "2rem", opacity: 0.9, textAlign: "center" }}>
          {textsMap[lang].welcome}
        </p>
        <p style={{ fontSize: "2rem", opacity: 0.5, textAlign: "center" }}>
          {textsMap[lang].prompt}
        </p>
      </div>
    );
  }

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

const textsMap = {
  eng: {
    welcome: "The truth is out there for those who seek it.",
    prompt: "What do you want to ask me today?",
  },
  pl: {
    welcome: "Prawda jest na wyciągnięcie ręki.",
    prompt: "O co chcesz dzisiaj zapytać?",
  },
};
