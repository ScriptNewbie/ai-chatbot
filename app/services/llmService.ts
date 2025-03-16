import { ChatEntry } from "../components/atoms/ChatMessage";

export const llmService = {
  completeChat: async (
    messages: ChatEntry[],
    onChunk: (chunk: string) => void
  ) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    const reader = res?.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Exit when the stream ends
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  },
};
