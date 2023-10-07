import { currentUser } from "@clerk/nextjs";

import OnboardingSideScreen from "@/components/onboarding-components/OnboardingSideScreen";
import Questionnaire from "@/components/onboarding-components/Questionnaire";
import { onboardingSideScreenInfo } from "@/constants";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const userClerkId = user?.id;

  return (
    <main className="onboarding-page">
      <OnboardingSideScreen info={onboardingSideScreenInfo} />
      <Questionnaire userClerkId={userClerkId} />
    </main>
  );
};

export default page;
