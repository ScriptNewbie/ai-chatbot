"use client"; // Mark this as a Client Component in Next.js

import { useState } from "react";

export default function Chat() {
  const [history, setHistory] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newHistory = [...history, { role: "user", content: message }];
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

    if (!reader) return;

    let response = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Exit when the stream ends
      const chunk = decoder.decode(value, { stream: true });
      response += chunk;
      setResponse((prev) => prev + chunk); // Append each chunk to the response
    }

    setHistory((prev: any) => [
      ...prev,
      { role: "assistant", content: response },
    ]);

    setResponse("");
  };

  return (
    <div>
      <div>
        {history.map((msg: any, i: number) => (
          <p key={i}>
            {msg.role === "user" ? "You: " : "AI: "}
            {msg.content}
          </p>
        ))}
        {response && <p>AI: {response}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
