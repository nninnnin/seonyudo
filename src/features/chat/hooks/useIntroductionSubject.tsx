"use client";

import { useSearchParams } from "next/navigation";

const useIntroductionSubject = () => {
  const searchParams = useSearchParams();

  const subject = searchParams.get("subject");

  return {
    subject,
  };
};

export default useIntroductionSubject;
