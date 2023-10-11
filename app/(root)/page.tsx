import {
  UserButton,
  SignOutButton,
  SignInButton,
  currentUser,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
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
            userPreviewAvatarContainer: "dark:grayscale-[60%]",
          },
        }}
      />
      <SignInButton>Sign In</SignInButton>
      <SignOutButton />
    </main>
  );
}
