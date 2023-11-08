import { CommentProps } from "@/types/posts";

export const groupCommentsByParentId = (
  comments: CommentProps[]
): Record<string, CommentProps[]> => {
  const group: Record<string, CommentProps[]> = {};
  comments.forEach((comment) => {
    const key =
      comment.parentId === null ? "null" : comment.parentId.toString();
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(comment);
  });
  return group;
};

export const getRepliesToComments = (
  commentsByParentId: Record<string, CommentProps[]>,
  parentId: string | null
) => {
  return commentsByParentId[parentId ?? "null"];
};
