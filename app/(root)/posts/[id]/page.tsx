import {
  LeftActionBar,
  AuthorDetails,
  PostMainContent,
  Profile,
  MoreInformation,
} from "@/components/posts/open-post-page";

const PostPage = async () => {
  return (
    <main className="flex h-full justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem]">
        <div className="flex flex-col gap-[1.25rem]">
          <LeftActionBar />
          <AuthorDetails />
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

export default PostPage;
