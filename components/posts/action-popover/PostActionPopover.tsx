"use client";

import { useRouter } from "next/navigation";

import { deletePost as deletePostAction } from "@/lib/actions/post.action";
import ActionPopover from "./ActionPopover";
interface PostActionPopoverProps {
  postId: number;
  label: string;
}

const PostActionPopover = ({ postId, label }: PostActionPopoverProps) => {
  const router = useRouter();

  const onEditClick = () => {
    router.push(`/posts/create-post?id=${postId}`);
  };

  const deletePost = async () => {
    try {
      await deletePostAction(postId);
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <ActionPopover
      onEditClick={onEditClick}
      deletePost={deletePost}
      label={label}
    />
  );
};

export default PostActionPopover;
