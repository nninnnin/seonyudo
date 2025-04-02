export const QueryKeys = {
  Introductions: "introductions",
};

export enum IntroductionSubjects {
  Project = "project",
  Work = "work",
  Ideas = "ideas",
  Seonyudo = "seonyudo",
}

export const INTRODUCTION_MODEL_KEYS = {
  [IntroductionSubjects.Project]:
    "projectIntroduction",
  [IntroductionSubjects.Work]: "artworkIntroduction",
  [IntroductionSubjects.Ideas]: "ideasIntroduction",
  [IntroductionSubjects.Seonyudo]:
    "seonyudoIntroduction",
};

export const INTRODUCTION_SUBJECTS = [
  {
    label: "프로젝트 소개",
    href: `/about?subject=${IntroductionSubjects.Project}`,
  },
  {
    label: "작품 소개",
    href: `/about?subject=${IntroductionSubjects.Work}`,
  },
  {
    label: "시민 아이디어 갤러리",
    href: `/about?subject=${IntroductionSubjects.Ideas}`,
  },
  {
    label: "선유도공원 소개",
    href: `/about?subject=${IntroductionSubjects.Seonyudo}`,
  },
];
