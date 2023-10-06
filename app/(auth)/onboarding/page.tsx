import TellUsAboutYourself from "@/components/onboarding-components/TellUsAboutYourself";
import Questionnaire from "@/components/onboarding-components/Questionnaire";

const page = () => {
  return (
    <main className="flex w-screen flex-col dark:bg-dark-dark2 md:min-h-screen md:flex-row">
      <TellUsAboutYourself />
      <Questionnaire />
    </main>
  );
};

export default page;
