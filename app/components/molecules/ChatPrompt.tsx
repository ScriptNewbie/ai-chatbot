import { ChatInput } from "../atoms/ChatInput";
import { ChatSendButton } from "../atoms/ChatSendButton";

export const ChatPrompt = ({
  message,
  setMessage,
  handleSubmit,
}: {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        backgroundColor: "rgb(30,30,30)",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <ChatInput message={message} setMessage={setMessage} />
        <ChatSendButton />
      </form>
    </div>
  );
};
