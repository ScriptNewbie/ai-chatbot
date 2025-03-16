import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChatSendButton = () => {
  return (
    <button type="submit">
      <FontAwesomeIcon
        style={{ height: "18px", marginRight: "18px" }}
        icon={faPaperPlane}
      />
    </button>
  );
};
