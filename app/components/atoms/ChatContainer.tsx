import { PropsWithChildren } from "react";

export const ChatContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          maxWidth: "95%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
