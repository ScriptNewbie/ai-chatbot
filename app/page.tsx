"use client"; // Mark this as a Client Component in Next.js

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatEntry, ChatMessage } from "./components/ChatMessage";

export default function Chat() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        height: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      <div style={{ flexGrow: 1, overflow: "scroll" }}>
        {history.map((msg: ChatEntry, i: number) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {(response || waitingForResponse) && (
          <ChatMessage
            ref={responseRef}
            message={{
              role: "assistant",
              content: response ? response : "...",
            }}
          />
        )}
      </div>
      <div style={{ display: "flex", backgroundColor: "red" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexGrow: 1 }}>
          <input
            style={{ flexGrow: 1 }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
