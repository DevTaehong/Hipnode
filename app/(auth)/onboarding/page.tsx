import { currentUser } from "@clerk/nextjs";

import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";

const Page = async () => {
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

export default Page;
