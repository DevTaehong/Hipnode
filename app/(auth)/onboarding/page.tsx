import { currentUser } from "@clerk/nextjs";
import {
  checkUserForClerkId,
  createUser,
  checkUserForBio,
} from "@/lib/user.actions";
import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userClerkId = user.id;
  const userEmail = user.emailAddresses[0].emailAddress;

  const { id, imageUrl, username, firstName, lastName } = user;

  const checkForClerkId = await checkUserForClerkId({ clerkId: id });
  const checkForBio = await checkUserForBio({ clerkId: id });
  if (checkForBio) {
    redirect("/");
  }

  if (!checkForClerkId) {
    await createUser({
      clerkId: id,
      name: `${firstName} ${lastName}`,
      username,
      picture: imageUrl,
      email: userEmail,
    });
  }

  return (
    <main className="onboarding-page">
      <OnboardingSideScreen info={onboardingSideScreenInfo} />
      <Questionnaire userClerkId={userClerkId} />
    </main>
  );
};

export default Page;
