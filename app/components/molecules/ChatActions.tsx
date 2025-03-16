import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LangPicker } from "../atoms/LangPicker";

export const ChatActions = ({ clearChat }: { clearChat: () => void }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "2ch" }}>
      <LangPicker />
      <button onClick={clearChat}>
        <FontAwesomeIcon style={{ height: "18px" }} icon={faTrash} />
      </button>
    </div>
  );
};
