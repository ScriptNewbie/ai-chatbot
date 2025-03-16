"use client";

import { FormEvent, useState } from "react";
import { ChatContainer } from "../atoms/ChatContainer";
import { ChatEntry } from "../atoms/ChatMessage";
import { ChatActions } from "../molecules/ChatActions";
import { ChatHistory } from "../molecules/ChatHistory";
import { ChatPrompt } from "../molecules/ChatPrompt";

export default function Chat() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const clearChat = () => {
    setHistory([]);
    setResponse("");
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    setWaitingForResponse(true);
    const newHistory: ChatEntry[] = [
      ...history,
      { role: "user", content: message },
    ];
    setHistory(newHistory);
    setMessage("");

    // Send the message to the API route
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history: newHistory,
      }),
    });

    // Read the streaming response
    const reader = res?.body?.getReader();
    const decoder = new TextDecoder();

    setWaitingForResponse(false);

    if (!reader) return;

    let response = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Exit when the stream ends
      const chunk = decoder.decode(value, { stream: true });
      response += chunk;
      setResponse((prev) => prev + chunk); // Append each chunk to the response
    }

    setHistory((prev) => [...prev, { role: "assistant", content: response }]);

    setResponse("");
  };

  return (
    <ChatContainer>
      <ChatActions clearChat={clearChat} />
      <ChatHistory
        history={history}
        response={response}
        waitingForResponse={waitingForResponse}
      />
      <ChatPrompt
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </ChatContainer>
  );
}
