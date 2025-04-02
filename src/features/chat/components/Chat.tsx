import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";
import { motion } from "motion/react";

import ChatBackground from "@/features/chat/components/ChatBackground";

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
          "overflow-auto overscroll-auto",
          "flex flex-col gap-[1em]",
          "p-[1em]",
          className
        )}
        style={style ?? {}}
        ref={forwardedRef}
      >
        <ChatBackground />

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
  animate,
  animateDelay = 0,
}: {
  uid: string;
  contents: string;
  type: "question" | "answer";
  image?: {
    name: string;
    path: string;
  };
  animate?: boolean;
  animateDelay?: number;
}) => {
  return (
    <motion.li
      id={`chat-item=${uid}`}
      initial={
        animate
          ? {
              opacity: 0,
              y: 20,
            }
          : {}
      }
      animate={
        animate
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.3,
        delay: animate ? animateDelay : 1,
      }}
    >
      <>
        {image && (
          <img className="mb-[1em]" src={image.path} />
        )}
      </>
      <Chat.Bubble type={type}>{contents}</Chat.Bubble>
    </motion.li>
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
        "p-[16px] py-[12px] rounded-xl",
        "font-medium text-[16px] leading-[134%] tracking-[-0.41px]",
        type === "question" && "bg-white",
        type === "answer" &&
          "bg-black bg-opacity-30 backdrop-blur-[30px] text-white ml-auto",
        "select-none"
      )}
    >
      {children}
    </div>
  );
};

Chat.Loading = () => {
  return (
    <div className="pb-[0.5em] text-center text-[2em] fixed bottom-0 left-1/2 -translate-x-1/2">
      {/* <div className="animate-bounce">🥹</div> */}
      <div className="animate-bounce"></div>
    </div>
  );
};

Chat.Ending = () => {
  return (
    <div className="pb-[1em] text-center text-white text-[1.2em] font-bold fixed bottom-0 left-1/2 -translate-x-1/2">
      {/* 마지막입니다! */}
    </div>
  );
};

export default Chat;
