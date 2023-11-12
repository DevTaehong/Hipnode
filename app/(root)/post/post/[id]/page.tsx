"use client";

import { PostProvider } from "@/context/posts-context/PostContext";
import PostPageContent from "@/components/posts/open-post-page/PostPageContent";

const PostPage = () => {
  return (
    <PostProvider>
      <PostPageContent />
    </PostProvider>
  );
};

export default PostPage;
