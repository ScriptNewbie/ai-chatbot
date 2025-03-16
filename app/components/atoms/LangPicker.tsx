import { useRouter, useSearchParams } from "next/navigation";

export const LangPicker = () => {
  const params = useSearchParams();
  const langParam = params.get("lang") || "eng";
  const lang = ["eng", "pl"].includes(langParam) ? langParam : "eng";
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    router.push(`?lang=${lang}`);
  };

  return (
    <div style={{ display: "flex", gap: "1ch" }}>
      <button
        onClick={() => changeLanguage("eng")}
        style={{ opacity: lang === "eng" ? 1 : 0.8 }}
      >
        ENG
      </button>{" "}
      <div style={{ opacity: 0.6 }}>|</div>{" "}
      <button
        onClick={() => changeLanguage("pl")}
        style={{ opacity: lang === "pl" ? 1 : 0.6 }}
      >
        PL
      </button>
    </div>
  );
};
