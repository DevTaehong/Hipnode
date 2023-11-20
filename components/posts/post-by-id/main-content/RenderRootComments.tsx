"use client";

import { CommentList } from "@/components/posts/comment";
import { useCreatePostStore } from "@/app/lexicalStore";

const RenderRootComments = () => {
  const { commentsByParentId } = useCreatePostStore();
  const rootComments = commentsByParentId.null;

  return (
    <section>
      {rootComments && rootComments.length > 0 && (
        <CommentList comments={rootComments} />
      )}
    </section>
  );
};

export default RenderRootComments;
