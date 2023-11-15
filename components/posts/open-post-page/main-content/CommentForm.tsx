"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
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
import { CommentFormProps } from "@/types/posts";
import { User } from "@prisma/client";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { useCreatePostStore } from "@/app/lexicalStore";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoaded, userId: clerkId } = useAuth();
  const { postId } = useCreatePostStore();
  const path = usePathname();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!clerkId) return;
      const user = await getUserByClerkId(clerkId);
      setCurrentUser(user);
    };
    if (clerkId && isLoaded) {
      fetchCurrentUser();
    }
    fetchCurrentUser();
  }, [clerkId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing) {
        setIsLoading(true);
        const commentID: number = Number(commentId);
        await updateComment(commentID, values.comment, path);
        setIsEditing(false);
        setIsLoading(false);
      } else if (currentUser?.id) {
        setIsLoading(true);
        const userId = currentUser?.id;
        await addCommentOrReply(
          userId,
          postId,
          values.comment,
          Number(parentId) || null,
          path
        );
      }
      setIsLoading(false);
      setIsReplying(false);
    } catch (error) {
      console.error("Error processing comment:", error);
    }
    form.reset();
  };

  if (!isLoaded || !clerkId) {
    return null;
  }

  return (
    <>
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
      {isLoading && <p className="pl-2 text-sc-5">Adding comment...</p>}
    </>
  );
};

export default CommentForm;
