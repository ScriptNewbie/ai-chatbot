"use client";

import { FormEvent, useEffect, useState } from "react";
import { ChatContainer } from "../atoms/ChatContainer";
import { ChatEntry } from "../atoms/ChatMessage";
import { ChatActions } from "../molecules/ChatActions";
import { ChatHistory } from "../molecules/ChatHistory";
import { ChatPrompt } from "../molecules/ChatPrompt";
import { llmService } from "@/app/services/llmService";

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

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const history = buildHistory();
    handleOnPromptSendUIUpdates(history);
    let response = "";
    await llmService.completeChat(
      history,
      (chunk) => {
        response += chunk;
        setResponse((prev) => prev + chunk);
      },
      () => setWaitingForResponse(false)
    );
    handleOnResponseReceivedUIUpdates(response);
  };

  const handleOnPromptSendUIUpdates = (history: ChatEntry[]) => {
    setWaitingForResponse(true);
    setHistory(history);
    setMessage("");
  };

  const handleOnResponseReceivedUIUpdates = (response: string) => {
    setHistory((prev) => [...prev, { role: "assistant", content: response }]);
    setResponse("");
  };

  const buildHistory = () => {
    const newHistory: ChatEntry[] = [
      ...history,
      { role: "user", content: message },
    ];
    return newHistory;
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
        sendPrompt={sendPrompt}
      />
    </ChatContainer>
  );
}
