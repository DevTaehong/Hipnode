import { currentUser } from "@clerk/nextjs";
import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    redirect("/");
  }
  const { id: userClerkId } = user;

  return (
    <main className="onboarding-page">
      <OnboardingSideScreen info={onboardingSideScreenInfo} />
      <Questionnaire userClerkId={userClerkId} />
    </main>
  );
};

export default Page;
