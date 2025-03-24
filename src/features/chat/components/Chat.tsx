import clsx from "clsx";
import React from "react";

const Chat = () => {
  return <Chat.Container>abc</Chat.Container>;
};

Chat.Container = ({
  className = "",
  height,
  children,
}: {
  className?: string;
  height?: number;
  children: React.ReactNode;
}) => {
  return (
    <ul
      className={clsx(
        "h-[300px] overflow-auto",
        "flex flex-col gap-[1em]",
        "p-[1em]",
        className
      )}
      style={{
        height: height ? `${height}px` : "auto",
      }}
    >
      {children}
    </ul>
  );
};

Chat.Item = ({
  contents,
  type,
  image,
}: {
  contents: string;
  type: "question" | "answer";
  image?: {
    name: string;
    path: string;
  };
}) => {
  return (
    <li>
      <>
        {image && (
          <img className="mb-[1em]" src={image.path} />
        )}
      </>
      <Chat.Bubble type={type}>{contents}</Chat.Bubble>
    </li>
  );
};

Chat.Bubble = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "question" | "answer";
}) => {
  return (
    <div
      className={clsx(
        "w-[270px] ",
        "p-[1em] rounded-xl",
        type === "question" && "bg-white",
        type === "answer" &&
          "bg-green-400 text-white ml-auto"
      )}
    >
      {children}
    </div>
  );
};

export default Chat;
