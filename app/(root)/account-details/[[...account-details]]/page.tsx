import { UserProfile } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="flex h-full min-h-screen w-full justify-center bg-white p-4 dark:bg-dark-3">
      <section className="flex w-fit">
        <UserProfile
          path="/account-details"
          appearance={{
            elements: {
              breadcrumbsItem: "dark:text-white",
              breadcrumbsItemDivider: "dark:text-white",
              avatarImageActionsUpload: "text-red-60",
              formButtonPrimary: "bg-red-60 dark:bg-red-80",
              formButtonReset: "text-red-60",
              formFieldLabel: "dark:text-white",
              formFieldInput: "dark:bg-dark-4 dark:text-light-2",
              userProfile: "flex",
              rootbox: "m-0 p-0 flex",
              headerTitle: "text-xl dark:text-light",
              headerSubtitle: "text-sm dark:text-light-2",
              navbarButton: "dark:text-light",
              pageScrollBox: "p-4 h-fit",
              navbar: "pt-4 pl-4 bg-white dark:bg-dark-2 rounded-l-xl",
              scrollBox: "",
              profilePage: "gap-0",
              profileSection: "gap-0",
              card: "h-fit m-0 bg-white dark:bg-dark-2",
              page: "gap-3",
              profileSectionTitle: "h-7",
              profileSectionTitleText: "text-sm self-center dark:text-light",
              profileSectionPrimaryButton: "h-7 px-2",
              accordionTriggerButton: "h-7 px-2 outline-0 focus-none ring-0",
              accordionContent: "p-2",
              profileSectionContent: "left-0 dark:text-white",
              navbarMobileMenuButton:
                "dark:text-white bg-light-2 dark:bg-dark-3",
              providerIcon: "dark:invert",
              formFieldInputShowPasswordIcon: "dark:invert",
            },
            variables: {
              colorPrimary: "#FF6934",
            },
          }}
        />
      </section>
    </main>
  );
};

export default Page;
