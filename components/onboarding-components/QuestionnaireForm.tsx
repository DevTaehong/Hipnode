import Link from "next/link";

import { QuestionnaireFormProps } from "@/interfaces";

const QuestionnaireForm = ({
  questions,
  animateClass,
  classVariants,
  handleQuestionClick,
  handleNextClick,
  selectedAnswers,
}: QuestionnaireFormProps) => {
  return (
    <section
      className="flex h-full w-full grow flex-col items-center bg-lightBackground-2 p-[1.875rem] dark:bg-dark-dark2 md:min-h-screen md:w-1/2 md:bg-lightBackground md:p-10
     md:dark:bg-dark-dark3 "
    >
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
            <Link href="/sign-in">
              <span className="semibold-14 cursor-pointer text-red-80">
                Sign in.
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuestionnaireForm;
