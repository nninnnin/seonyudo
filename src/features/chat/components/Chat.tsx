import clsx from "clsx";
import React from "react";

const Chat = () => {
  return <Chat.Container>abc</Chat.Container>;
};

Chat.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ul
      className={clsx(
        "flex flex-col gap-[1em]",
        "p-[1em]"
      )}
    >
      {children}
    </ul>
  );
};

Chat.Item = ({
  contents,
  type,
}: {
  contents: string;
  type: "question" | "answer";
}) => {
  return (
    <li
      className={clsx(
        "w-[270px] ",
        "p-[1em] rounded-xl",
        type === "question" && "bg-white",
        type === "answer" &&
          "bg-green-400 text-white ml-auto"
      )}
    >
      {contents}
    </li>
  );
};

export default Chat;
