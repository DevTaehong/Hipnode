import { UserButton, SignOutButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
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
