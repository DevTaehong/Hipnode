"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
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
import { addCommentOrReply, updateComment } from "@/lib/actions/post.action";
import { CommentFormProps } from "@/types/posts";
import { User } from "@prisma/client";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { Textarea } from "@/components/ui/textarea";

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
  postId,
}: CommentFormProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoaded, userId: clerkId } = useAuth();

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

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  if (!isLoaded || !clerkId) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Form {...form}>
        <form className={className}>
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        resetHeight={onSubmit}
                        {...field}
                        onKeyDown={handleKeyDown}
                        placeholder="Say something cool.... 🔥"
                        className="flex h-[45px] w-full resize-none items-center bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <Image
                src="/smiley.svg"
                alt="smiley"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <Button className="hidden" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {isLoading && <p className="pl-2 text-sc-5">Adding comment...</p>}
    </div>
  );
};

export default CommentForm;
