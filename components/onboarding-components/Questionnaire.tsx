"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createOnboarding } from "@/lib/actions/user.actions";
import {
  UserAnswersType,
  AnswersType,
  QuestionKeysMapType,
  QuestionnaireProps,
} from "@/types";
import { QuestionnaireForm } from ".";
import { onboardingQuestions } from "@/constants";

const Questionnaire = ({ userClerkId }: QuestionnaireProps) => {
  const router = useRouter();
  const [questionSet, setQuestionSet] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswersType[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswersType>({});
  const questions = onboardingQuestions[questionSet];

  const handleQuestionClick = (question: AnswersType) => {
    if (questionSet === 2) {
      setSelectedAnswers((prevAnswers) =>
        prevAnswers.includes(question)
          ? prevAnswers.filter((q) => q !== question)
          : [...prevAnswers, question]
      );
    } else {
      setSelectedAnswers([question]);
    }
  };

  const handleAnimate = () => {
    setAnimateIn(true);
    setTimeout(() => {
      setAnimateIn(false);
    }, 200);
  };

  const handleNextClick = () => {
    if (selectedAnswers.length) {
      if (questionSet === 2) {
        const allAnswers = {
          ...userAnswers,
          answersQuestion3: selectedAnswers as string[],
        };
        createOnboarding(userClerkId, allAnswers);
        router.push("/");
      } else {
        const questionKeysMap: QuestionKeysMapType = {
          0: "answerQuestion1",
          1: "answerQuestion2",
        };
        handleAnimate();
        const answerKey = questionKeysMap[questionSet];
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          [answerKey]: selectedAnswers[0],
        }));

        setQuestionSet((prevSet) => prevSet + 1);
        setSelectedAnswers([]);
      }
    }
  };

  const classVariants =
    questionSet === 2
      ? {
          parentDivFlex: "flex-wrap",
          childDivWidth: "w-fit",
          buttonWidth: "w-[10.5rem]",
          buttonText: "Get Started",
        }
      : {
          parentDivFlex: "flex-col",
          childDivWidth: "w-full",
          buttonWidth: "w-[7.25rem]",
          buttonText: "Next",
        };

  const animateClass = animateIn
    ? "opacity-0"
    : "opacity-100 transition duration-200";

  return (
    <QuestionnaireForm
      questions={questions}
      animateClass={animateClass}
      classVariants={classVariants}
      handleQuestionClick={handleQuestionClick}
      handleNextClick={handleNextClick}
      selectedAnswers={selectedAnswers}
      questionSet={questionSet}
    />
  );
};

export default Questionnaire;
