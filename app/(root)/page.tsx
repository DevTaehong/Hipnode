import {
  UserButton,
  SignOutButton,
  SignInButton,
  currentUser,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  let user;

  try {
    user = currentUser();
  } catch (error) {
    console.error("Failed to fetch the current user:", error);
    redirect("/sign-up");
  }

  if (!user) {
    redirect("/sign-up");
  }

  return (
    <main>
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
    </main>
  );
}
