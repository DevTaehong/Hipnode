import LeftActionBar from "@/components/posts/open-post-page/left-column-action-bar/LeftActionBar";
import PostMainContent from "@/components/posts/open-post-page/main-content/PostMainContent";
import MoreInformation from "@/components/posts/open-post-page/right-column/MoreInformation";
import Profile from "@/components/posts/open-post-page/right-column/Profile";

const Page = async () => {
  return (
    <main className="flex justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem]">
        <div>
          <LeftActionBar />
        </div>
        <div className="mx-[1.25rem]">
          <PostMainContent />
        </div>
        <div className="flex flex-col gap-[1.25rem]">
          <Profile />
          <MoreInformation />
        </div>
      </div>
    </main>
  );
};

export default Page;
