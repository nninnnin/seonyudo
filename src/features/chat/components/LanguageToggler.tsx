import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { languageStore } from "@/shared/store/language";

const LanguageToggler = () => {
  const { language, setLanguage } =
    useStore(languageStore);

  return (
    <div
      className={clsx(
        "flex gap-[16px]",
        "fixed bottom-[16px] left-[16px]",
        "text-white font-bold"
      )}
    >
      <div onClick={() => setLanguage("KO")}>한</div>
      <div onClick={() => setLanguage("EN")}>EN</div>
    </div>
  );
};

export default LanguageToggler;
