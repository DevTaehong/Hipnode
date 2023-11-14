import { useEffect, useMemo } from "react";

import CommentList from "@/components/posts/comment/CommentList";
import {
  TagsList,
  PostTitle,
  PostImage,
  PostDescription,
  CommentBox,
} from "./index";
import { groupCommentsByParentId } from "@/utils";
import { useCreatePostStore } from "@/app/lexicalStore";

const PostMainContent = ({ postData }: any) => {
  const { tags, image, heading, content, id } = postData;
  const { setPostId, setCommentsByParentId } = useCreatePostStore(
    (state) => state
  );

  useEffect(() => {
    setPostId(id);
  }, [id]);

  const tagNames = tags?.map((tagRelation: any) => tagRelation.tag.name) ?? [];
  const rootComments = groupCommentsByParentId(postData.comments)?.null;

  const commentsId = useMemo(
    () => groupCommentsByParentId(postData.comments),
    [postData]
  );

  useEffect(() => {
    setCommentsByParentId(commentsId);
  }, [commentsId]);

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <section>
        <PostImage
          src={image || ""}
          alt="post-image"
          width={335}
          height={117}
        />
        <PostTitle title={heading || ""} />
        <TagsList tags={tagNames} />
        <PostDescription description={content || ""} />
        <CommentBox />
      </section>
      <section>
        {rootComments && rootComments?.length > 0 && (
          <CommentList comments={rootComments} />
        )}
      </section>
    </main>
  );
};

export default PostMainContent;
