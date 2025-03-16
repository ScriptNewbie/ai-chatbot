"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatEntry, ChatMessage } from "./components/ChatMessage";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chat() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, history, ref]);

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          maxWidth: "95dvw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            onClick={clearChat}
          >
            <FontAwesomeIcon style={{ height: "18px" }} icon={faTrash} />
          </button>
        </div>
        <div style={{ flexGrow: 1, overflow: "scroll" }}>
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
        <div
          style={{
            display: "flex",

            borderWidth: 0,
            borderRadius: "8px",
            backgroundColor: "rgb(30,30,30)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexGrow: 1 }}
          >
            <input
              style={{
                flexGrow: 1,
                marginRight: "8px",
                borderWidth: 0,
                padding: "16px",
                backgroundColor: "transparent",
              }}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <button
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              type="submit"
            >
              <FontAwesomeIcon
                style={{ height: "18px", marginRight: "18px" }}
                icon={faPaperPlane}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
