import {
  UserButton,
  SignOutButton,
  SignInButton,
  currentUser,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { isLoggedInUserOnboarded } from "@/lib/actions/user.actions";

export default async function Home() {
  let user;

  try {
    user = await currentUser();
  } catch (error) {
    console.error("Failed to fetch the current user:", error);
    redirect("/sign-up");
  }

  if (user) {
    const checkedUser = await isLoggedInUserOnboarded(user.id);
    if (!checkedUser) {
      redirect("/onboarding");
    }
  } else {
    redirect("/sign-up");
  }

  return (
    <section>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonPopoverCard: "dark:bg-dark-2",
            userPreviewMainIdentifier: "dark:text-white",
            userPreviewSecondaryIdentifier: "dark:text-sc-5",
            userButtonPopoverActionButtonText: "dark:text-white",
            userButtonPopoverActionButtonIcon: "dark:invert",
            userButtonPopoverFooter: "dark:invert",
          },
        }}
      />
      <SignInButton>Sign In</SignInButton>
      <SignOutButton />
    </section>
  );
}
