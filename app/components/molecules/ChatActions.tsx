import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChatActions = ({ clearChat }: { clearChat: () => void }) => {
  return (
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
  );
};
