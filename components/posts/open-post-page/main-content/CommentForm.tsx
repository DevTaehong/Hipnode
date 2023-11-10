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
}: CommentFormProps) => {
  const {
    setComments,
    comments,
    currentUser,
    currentPost,
    setIsEditing,
    setIsReplying,
  } = usePost();

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
        await updateComment(commentID, values.comment);
        setComments(
          comments?.map((comment) => {
            if (comment.id === commentID) {
              return {
                ...comment,
                content: values.comment,
              };
            }
            return comment;
          })
        );
        setIsEditing(false);
      } else if (comments && currentPost && currentUser?.id) {
        const userId = currentUser?.id;
        const newComment = await addCommentOrReply(
          userId,
          currentPost.id,
          values.comment,
          Number(parentId) || null
        );
        setComments([...comments, newComment]);
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
