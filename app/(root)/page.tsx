import { UserButton, SignOutButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonPopoverCard: "dark:bg-dark-dark2",
            userPreviewMainIdentifier: "dark:text-white",
            userPreviewSecondaryIdentifier: "dark:text-lightBackground-5",
            userButtonPopoverActionButtonText: "dark:text-white",
            userButtonPopoverActionButtonIcon: "dark:invert",
            userButtonPopoverFooter: "dark:invert",
            userPreviewAvatarContainer: "dark:grayscale-[60%]",
          },
        }}
      />
      <SignInButton>Sign In</SignInButton>
      <SignOutButton />
    </div>
  );
}
