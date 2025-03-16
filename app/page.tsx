import { Suspense } from "react";
import Chat from "./components/organisms/Chat";

export default function Page() {
  return (
    <Suspense>
      <div style={{ width: "100dvw", height: "100dvh" }}>
        <Chat />
      </div>
    </Suspense>
  );
}
