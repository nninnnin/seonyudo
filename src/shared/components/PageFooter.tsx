import clsx from "clsx";
import React from "react";

import LanguageToggler from "@/features/chat/components/LanguageToggler";
import { useStore } from "zustand";
import {
  Languages,
  languageStore,
} from "@/shared/store/language";

const PageFooter = () => {
  return (
    <div
      className={clsx(
        "w-full",
        "fixed bottom-0 z-[1000] ",
        "flex justify-between items-center",
        "px-[18px] pr-[20px] pb-[18px]",
        "text-white text-[20px] font-bold leading-[134%]"
      )}
    >
      <PageFooter.선유동화 />
      <LanguageToggler />
    </div>
  );
};

PageFooter.선유동화 = () => {
  const { language } = useStore(languageStore);

  const contents: {
    [key in Languages]: string;
  } = {
    KO: "선유동화",
    EN: "Seonyu Donghwa",
  };

  const text: string = contents[language];

  return <span>{text}</span>;
};

export default PageFooter;
