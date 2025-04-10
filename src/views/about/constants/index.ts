export const QueryKeys = {
  Introductions: "introductions",
};

export enum IntroductionSubjects {
  Project = "project",
  Work = "work",
  Ideas = "ideas",
  Seonyudo = "seonyudo",
  Guide = "guide",
}

export const INTRODUCTION_MODEL_KEYS = {
  [IntroductionSubjects.Project]:
    "projectIntroduction",
  [IntroductionSubjects.Work]: "artworkIntroduction",
  [IntroductionSubjects.Ideas]: "ideasIntroduction",
  [IntroductionSubjects.Seonyudo]:
    "seonyudoIntroduction",
  [IntroductionSubjects.Guide]: "guidechat",
};

export const INTRODUCTION_SUBJECTS = [
  {
    label: "프로젝트 소개",
    labelEn: "Project Overview",
    href: `/about?subject=${IntroductionSubjects.Project}`,
  },
  {
    label: "작품 소개",
    labelEn: "Introduction to the Artwork",
    href: `/about?subject=${IntroductionSubjects.Work}`,
  },
  {
    label: "시민 아이디어 스케치",
    labelEn: "Citizen Idea Sketches",
    href: `/about?subject=${IntroductionSubjects.Ideas}`,
  },
  {
    label: "선유도공원 소개",
    labelEn: "About Seonyu Park",
    href: `/about?subject=${IntroductionSubjects.Seonyudo}`,
  },
  {
    label: "FAQ",
    labelEn: "FAQ",
    href: `/about?subject=${IntroductionSubjects.Guide}`,
  },
];
