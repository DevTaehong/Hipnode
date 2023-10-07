import {
  UserButton,
  SignOutButton,
  SignInButton,
  UserProfile,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonPopoverCard: "dark:bg-dark-2",
            userPreviewMainIdentifier: "dark:text-white",
            userPreviewSecondaryIdentifier: "dark:text-light-5",
            userButtonPopoverActionButtonText: "dark:text-white",
            userButtonPopoverActionButtonIcon: "dark:invert",
            userButtonPopoverFooter: "dark:invert",
            userPreviewAvatarContainer: "dark:grayscale-[60%]",
          },
        }}
      />
      <SignInButton>Sign In</SignInButton>
      <UserProfile />
      <SignOutButton />
    </div>
  );
}
