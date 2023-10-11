import { currentUser } from "@clerk/nextjs";
import { checkUserForBio } from "@/lib/user.actions";
import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const { id: userClerkId } = user;

  const checkForBio = await checkUserForBio({ clerkId: userClerkId });
  if (checkForBio) {
    redirect("/");
  }

  return (
    <main className="onboarding-page">
      <OnboardingSideScreen info={onboardingSideScreenInfo} />
      <Questionnaire userClerkId={userClerkId} />
    </main>
  );
};

export default Page;
