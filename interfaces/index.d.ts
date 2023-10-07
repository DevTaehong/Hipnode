import { onboardingQuestions } from "@/constants";
import { AnswersType, PostItem } from "@/types";

export interface QuestionnaireProps {
  userClerkId: string;
}

export interface QuestionnaireFormProps {
  questions: (typeof onboardingQuestions)[number];
  animateClass: string;
  classVariants: {
    parentDivFlex: string;
    childDivWidth: string;
    buttonWidth: string;
    buttonText: string;
  };
  handleQuestionClick: (question: AnswersType) => void;
  handleNextClick: () => void;
  selectedAnswers: AnswersType[];
}

export interface OnboardingSideScreenProps {
  info?: {
    title: string;
    posts: PostItem[];
  };
}
