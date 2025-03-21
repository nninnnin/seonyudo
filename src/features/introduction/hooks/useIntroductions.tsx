import { useEffect } from "react";

import { IntroductionSubjects } from "@/features/introduction/constants";

const useIntroductions = (
  subject: IntroductionSubjects
) => {
  useEffect(() => {
    console.log(subject);
  }, [subject]);

  return;
};

export default useIntroductions;
