import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChatSendButton = () => {
  return (
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
  );
};
