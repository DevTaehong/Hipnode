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
    <section className="questionnaire-form-background">
      <div className="questionnaire-main-div">
        <div className={`questionnaire-container ${animateClass}`}>
          <h3 className="questionnaire-heading">{questions.title}</h3>
          <div className={`flex ${classVariants.parentDivFlex} gap-5`}>
            {questions.answers.map((question) => (
              <div
                key={question}
                onClick={() => handleQuestionClick(question)}
                className={`${
                  classVariants.childDivWidth
                } questionnaire-answer ${
                  selectedAnswers.includes(question)
                    ? "bg-red-80"
                    : "bg-light dark:bg-dark-4 md:bg-light-2"
                } `}
              >
                <p
                  className={`questionnaire-answer-text ${
                    selectedAnswers.includes(question)
                      ? "text-light-2"
                      : "text-sc-2 dark:text-light-2"
                  }`}
                >
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="questionnaire-button-container">
          <button
            onClick={handleNextClick}
            disabled={!selectedAnswers.length}
            className={`questionnaire-button ${classVariants.buttonWidth}  ${
              selectedAnswers.length ? "bg-red-80" : "bg-red-60"
            } `}
          >
            {classVariants.buttonText}
          </button>
          <p className="questionnaire-footer-text">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="questionnaire-footer-span-text">Sign in.</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuestionnaireForm;
