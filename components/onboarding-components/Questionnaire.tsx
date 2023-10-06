"use client";

import { useState } from "react";
import { onboardingQuestions } from "@/constants";

type AnswersType = string | string[];

type UserAnswersType = {
  answerQuestion1?: string;
  answerQuestion2?: string;
  answersQuestion3?: string[];
};

const Questionnaire = () => {
  const [questionSet, setQuestionSet] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswersType[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswersType>({});
  const questions = onboardingQuestions[questionSet];

  const handleQuestionClick = (question: AnswersType) => {
    if (questionSet === 2) {
      setSelectedAnswers((prevQuestions) =>
        prevQuestions.includes(question)
          ? prevQuestions.filter((q) => q !== question)
          : [...prevQuestions, question]
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
        console.log("Final answers:", {
          ...userAnswers,
          answersQuestion3: selectedAnswers as string[],
        });
      } else if (questionSet === 0) {
        handleAnimate();
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          answerQuestion1: selectedAnswers[0] as string,
        }));
        setQuestionSet((prevSet) => prevSet + 1);
        setSelectedAnswers([]);
      } else if (questionSet === 1) {
        handleAnimate();
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          answerQuestion2: selectedAnswers[0] as string,
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
    <section className="dark:md:bg-dark-dark2md:dark:bg-dark-dark3 flex h-full w-full grow flex-col items-center bg-lightBackground-2 p-[1.875rem] md:min-h-screen md:w-1/2 md:bg-lightBackground md:p-10 ">
      <div className="mt-[3.75rem] flex w-full max-w-[27.625rem] flex-col gap-10  md:mt-[7.37rem]">
        <div className={`flex flex-col gap-10 ${animateClass}`}>
          <h3 className="semibold-18 md:bold-30 text-dark-secondary2 dark:text-lightBackground">
            {questions.title}
          </h3>
          <div className={`flex ${classVariants.parentDivFlex} gap-5`}>
            {questions.answers.map((question) => (
              <div
                key={question}
                onClick={() => handleQuestionClick(question)}
                className={`${
                  classVariants.childDivWidth
                } cursor-pointer rounded-lg p-4 transition duration-200 ${
                  selectedAnswers.includes(question)
                    ? "bg-red-80"
                    : "bg-lightBackground dark:bg-dark-dark4 md:bg-lightBackground-2"
                } `}
              >
                <p
                  className={`semibold-14 md:semibold-18 transition duration-200 ${
                    selectedAnswers.includes(question)
                      ? "text-lightBackground-2"
                      : "text-dark-secondary2 dark:text-lightBackground-2 "
                  }`}
                >
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button
            onClick={handleNextClick}
            disabled={!selectedAnswers.length}
            className={`semibold-18 flex h-[2.875rem] transition duration-200 ${
              classVariants.buttonWidth
            } items-center justify-center self-start rounded-lg ${
              selectedAnswers.length ? "bg-red-80" : "bg-red-60"
            } text-lightBackground-2`}
          >
            {classVariants.buttonText}
          </button>
          <p className="text-dark-secondary2 dark:text-lightBackground-2">
            Already have an account?{" "}
            <span className="semibold-14 cursor-pointer text-red-80">
              Sign in.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
