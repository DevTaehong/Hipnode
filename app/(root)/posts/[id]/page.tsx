"use client";

import { PostProvider } from "@/context/PostContext";

import {
  LeftActionBar,
  AuthorDetails,
  PostMainContent,
  Profile,
  MoreInformation,
} from "@/components/posts/open-post-page";

const PostPage = () => {
  return (
    <PostProvider>
      <PostPageContent />
    </PostProvider>
  );
};

const PostPageContent = () => {
  return (
    <main className="flex h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar />
          <AuthorDetails />
        </div>
        <div className="order-1 pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <PostMainContent />
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <Profile />
          <MoreInformation />
        </div>
      </div>
    </main>
  );
};

export default PostPage;
