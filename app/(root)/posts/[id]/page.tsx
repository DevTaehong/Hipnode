"use client";

import { usePost, PostProvider } from "@/context/PostContext";

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
  const { currentPost, currentUser } = usePost();

  if (!currentPost) return null;
  const { author, createdAt, heading, content, image, tags } = currentPost;
  const { picture } = currentUser;

  return (
    <main className="flex h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar />
          <AuthorDetails username={author.username} createdAt={createdAt} />
        </div>
        <div className="order-1 pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <PostMainContent
            imageSrc={image}
            heading={heading}
            content={content}
            tags={tags}
          />
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <Profile username={author.username} image={picture} />
          <MoreInformation username={author.username} />
        </div>
      </div>
    </main>
  );
};

export default PostPage;
