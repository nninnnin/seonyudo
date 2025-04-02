import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { languageStore } from "@/shared/store/language";

const LanguageToggler = () => {
  const { language, toggleLanguage } =
    useStore(languageStore);

  const handleClick = () => {
    toggleLanguage();
  };

  return (
    <div
      id="language-toggler"
      className={clsx(
        "flex gap-[16px]",
        "text-white font-bold",
        "uppercase",
        "w-[44px] h-[44px]",
        "flex justify-center items-center"
      )}
      onClick={handleClick}
    >
      {language}
    </div>
  );
};

export default LanguageToggler;
