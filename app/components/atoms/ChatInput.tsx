export const ChatInput = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
}) => {
  return (
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
  );
};
