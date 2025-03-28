import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";

const Chat = () => {};

Chat.Container = forwardRef(
  (
    {
      className = "",
      style,
      children,
    }: {
      className?: string;
      style?: React.CSSProperties;
      children: React.ReactNode;
    },
    forwardedRef: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <ul
        className={clsx(
          "chat-container",
          "overflow-auto",
          "flex flex-col gap-[1em]",
          "p-[1em]",
          className
        )}
        style={style ?? {}}
        ref={forwardedRef}
      >
        {children}
      </ul>
    );
  }
);

Chat.Item = ({
  uid,
  contents,
  type,
  image,
}: {
  uid: string;
  contents: string;
  type: "question" | "answer";
  image?: {
    name: string;
    path: string;
  };
}) => {
  return (
    <li id={`chat-item=${uid}`}>
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
        // "animate-chat-bubble" // TODO: 스크롤링 이후 추가되도록
      )}
    >
      {children}
    </div>
  );
};

Chat.Loading = () => {
  return (
    <div className="pb-[0.5em] text-center text-[2em] fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="animate-bounce">🥹</div>
    </div>
  );
};

Chat.Ending = () => {
  return (
    <div className="pb-[1em] text-center text-white text-[1.2em] font-bold fixed bottom-0 left-1/2 -translate-x-1/2">
      마지막입니다!
    </div>
  );
};

export default Chat;
