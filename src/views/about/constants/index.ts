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
