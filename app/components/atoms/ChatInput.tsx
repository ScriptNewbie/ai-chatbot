import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const ChatInput = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
}) => {
  const params = useSearchParams();
  const langParam = params.get("lang") || "eng";
  const lang = (
    langParam in textsMap ? langParam : "eng"
  ) as keyof typeof textsMap;

  const placeholders = useMemo(() => textsMap[lang], [lang]);

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    //States will update and retrigger this effect, no need to use setInterval
    const timeout = setTimeout(() => {
      if (visibleCharacters === placeholders[currentPlaceholder].length) {
        setDirection(-1);
      } else if (visibleCharacters === 0 && direction === -1) {
        setCurrentPlaceholder(
          (visibleCharacters) => (visibleCharacters + 1) % placeholders.length
        );
        setDirection(1);
        setVisibleCharacters(0);
        return;
      }
      setVisibleCharacters(visibleCharacters + direction);
    }, 50);
    return () => clearTimeout(timeout);
  }, [visibleCharacters, direction, currentPlaceholder, placeholders]);

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
      placeholder={placeholders[currentPlaceholder].slice(0, visibleCharacters)}
    />
  );
};

const textsMap = {
  eng: [
    "How was the moon landing staged?",
    "What is the NWO up to today?",
    "What do I need to know about 5G?",
    "Are pigeons just government drones in disguise?",
  ],
  pl: [
    "Jak dokonano mistyfikacji lądowania na Księżycu?",
    "Co dzisiaj kombinuje NWO?",
    "Co muszę wiedzieć o 5G?",
    "Ptaki to zwierzęta czy rządowe drony?",
  ],
};
