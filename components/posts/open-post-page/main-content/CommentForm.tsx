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
import { addCommentOrReply } from "@/lib/actions/post.action";
import { usePost } from "@/context/posts-context/PostContext";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 1 characters.",
  }),
});

interface CommentFormProps {
  className?: string;
  placeholder?: string;
  parentId?: string;
}

const CommentForm = ({
  className,
  placeholder,
  parentId,
}: CommentFormProps) => {
  const { setComments, comments, currentUser, currentPost } = usePost();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (comments && currentPost && currentUser?.id) {
        const userId = currentUser?.id;
        const newComment = await addCommentOrReply(
          userId,
          currentPost.id,
          values.comment,
          Number(parentId) || null
        );
        console.log(userId);
        console.log(currentPost.id);
        console.log(values.comment);
        console.log(parentId);

        setComments([...comments, newComment]);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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
