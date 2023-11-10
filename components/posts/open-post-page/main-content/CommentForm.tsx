// eslint-disable-next-line
import { experimental_useOptimistic as useOptimistic } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCommentOrReply, updateComment } from "@/lib/actions/post.action";
import { usePost } from "@/hooks/context/usePost";
import { CommentFormProps } from "@/types/posts";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 1 characters.",
  }),
});

const CommentForm = ({
  className,
  parentId,
  value = ``,
  isEditing = false,
  commentId,
  setIsEditing,
  setIsReplying,
}: CommentFormProps) => {
  const { setComments, comments, currentUser, currentPost } = usePost();
  const [optimisticComments, setOptimisticComments] =
    useOptimistic<CommentFormProps[]>(comments);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing) {
        const commentID: number = Number(commentId);
        const updatedComments = optimisticComments.map(
          (comment: CommentFormProps) =>
            Number(comment.id) === commentID
              ? { ...comment, content: values.comment }
              : comment
        );
        setOptimisticComments((prevs: CommentFormProps[]) => [
          ...prevs,
          updatedComments,
        ]);
        await updateComment(commentID, values.comment);
        setComments(updatedComments);
        setIsEditing(false);
      } else if (comments && currentPost && currentUser?.id) {
        const newCommentData = {
          content: values.comment,
          authorId: currentUser?.id,
          postId: currentPost.id,
          parentId: Number(parentId) || null,
        };
        setOptimisticComments((prevs: CommentFormProps[]) => [
          ...prevs,
          newCommentData,
        ]);

        const userId = currentUser?.id;
        const newComment = await addCommentOrReply(
          userId,
          currentPost.id,
          values.comment,
          Number(parentId) || null
        );
        setComments([...optimisticComments, newComment]);
      }
      setIsReplying(false);
    } catch (error) {
      console.error("Error processing comment:", error);
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Say something cool.... 🔥"
                  className="bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="hidden" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
