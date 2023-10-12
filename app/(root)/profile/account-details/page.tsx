import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-white dark:bg-dark-3">
      <div className="flex w-fit p-3">
        <UserProfile
          appearance={{
            elements: {
              userProfile: "flex",
              rootbox: "m-0 p-0 flex",
              headerTitle: "text-xl",
              headerSubtitle: "text-sm",
              navbar: "p-3",
              pageScrollBox: "p-3 h-fit",
              scrollBox: "",
              profilePage: "gap-0",
              profileSection: "gap-0",
              card: "h-fit w-tit m-0",
              page: "gap-3",
              profileSectionTitle: "h-7",
              profileSectionPrimaryButton: "h-7 ",
              accordionTriggerButton: "h-7",
              profileSectionContent: "left-0",
            },
          }}
        />
      </div>
    </div>
  );
};

export default page;
