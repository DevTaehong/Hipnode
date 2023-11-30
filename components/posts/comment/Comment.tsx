"use client";

import { useReducer } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  StraightLine,
  CurveLine,
} from "@/components/icons/outline-icons/LineIcons";
import {
  deleteCommentOrReply,
  toggleLikeComment,
} from "@/lib/actions/post.action";
import { CommentActions, CommentHeader } from ".";
import CommentForm from "./CommentForm";
import { getRepliesToComments as getReplies } from "@/utils/index";
import { CommentAuthorProps } from "@/types/posts";
import useCommentGrouping from "./useCommentGrouping";
import { commentReducer } from "@/lib/reducer";

const initialState = {
  showChildren: false,
  isDeleting: false,
  isEditing: false,
  isReplying: false,
  isLiked: false,
};

const Comment = ({
  content,
  createdAt,
  isEdited,
  author: { picture, username },
  id,
  postId,
  likedByCurrentUser,
  userId,
}: CommentAuthorProps) => {
  const path = usePathname();

  const [commentsByParentId] = useCommentGrouping({
    postId,
    userId,
  });

  const [state, dispatch] = useReducer(commentReducer, {
    ...initialState,
    isLiked: likedByCurrentUser,
  });

  const handleDelete = async () => {
    try {
      dispatch({ type: "SET_IS_DELETING", payload: true });
      await deleteCommentOrReply(id, path);
      dispatch({ type: "SET_IS_DELETING", payload: false });
    } catch (error) {
      console.error("Error deleting comment:", error);
      dispatch({ type: "SET_IS_DELETING", payload: false });
    }
  };

  const toggleLikeHandler = async () => {
    try {
      await toggleLikeComment(userId, id);
      dispatch({ type: "TOGGLE_IS_LIKED" });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const getRepliesToComments = (parentId: string | null) =>
    getReplies(commentsByParentId, parentId);

  const childComments = getRepliesToComments(String(id)) ?? [];

  return (
    <>
      <section className="flex py-[1.25rem] pr-[1.25rem]">
        <div className="flex flex-col">
          <div className="flex items-start justify-center px-[1.25rem]">
            <div className="h-10 w-10">
              <Image
                src={picture}
                alt="comment author image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          {childComments.length > 0 && !state.showChildren && (
            <AvatarJoinLine />
          )}
        </div>
        <div className="flex w-full flex-col gap-[1rem]">
          <div className="flex grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
            <CommentHeader
              username={username}
              createdAt={createdAt}
              isEdited={isEdited}
            />
            <div className="flex flex-wrap text-[1rem] leading-[1.5rem] text-sc-3">
              {content}
            </div>

            {state.isReplying && (
              <CommentForm
                parentId={String(id)}
                isReplying={true}
                setIsReplying={() => dispatch({ type: "TOGGLE_IS_REPLYING" })}
                setIsEditing={() => dispatch({ type: "TOGGLE_IS_EDITING" })}
                postId={postId}
              />
            )}
            {state.isEditing && (
              <CommentForm
                parentId={String(id)}
                value={content}
                isEditing={true}
                commentId={String(id)}
                setIsReplying={() => dispatch({ type: "TOGGLE_IS_REPLYING" })}
                setIsEditing={() => dispatch({ type: "TOGGLE_IS_EDITING" })}
                postId={postId}
              />
            )}
          </div>

          {state.isDeleting || state.isEditing ? (
            <div className="text-white">
              {state.isDeleting ? "Deleting..." : "Editing..."}
            </div>
          ) : (
            <CommentActions
              onToggleLike={toggleLikeHandler}
              onToggleReply={() => dispatch({ type: "TOGGLE_IS_REPLYING" })}
              onDelete={handleDelete}
              onEdit={() => dispatch({ type: "TOGGLE_IS_EDITING" })}
              onToggleChildren={() =>
                dispatch({ type: "TOGGLE_SHOW_CHILDREN" })
              }
              isLiked={state.isLiked}
              isReplying={state.isReplying}
            />
          )}
        </div>
      </section>

      {childComments.length > 0 && !state.showChildren && (
        <div className="flex grow flex-col pl-[2.25rem]">
          {childComments.map((comment: Partial<CommentAuthorProps>) => (
            <div key={comment.id} className="mt-2 flex flex-col">
              <Comment {...comment} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;

const AvatarJoinLine = () => (
  <div className="relative flex h-full flex-col items-center">
    <StraightLine className="h-full w-10 grow basis-0" />
    <StraightLine className="absolute h-full w-10 grow basis-0 translate-y-[3.2rem]" />
    <div className="flex translate-y-[4.45rem]">
      <div className="w-10">
        <CurveLine />
      </div>
    </div>
  </div>
);
