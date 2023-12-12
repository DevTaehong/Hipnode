"use client";

import { useState, KeyboardEvent, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { addCommentOrReply, updateComment } from "@/lib/actions/post.action";
import { CommentFormProps } from "@/types/posts";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 1 characters.",
  }),
});

type EmojiData = {
  native: string;
};

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const path = usePathname();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateComment(Number(commentId), values.comment, path);
        setIsEditing?.(false);
      } else {
        await addCommentOrReply(
          postId,
          values.comment,
          Number(parentId) || null,
          path
        );
        setIsReplying?.(false);
      }
    } catch (error) {
      console.error("Error processing comment:", error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const handleEmojiSelect = (emoji: EmojiData) => {
    const emojiNative = emoji.native;
    const currentValue = form.getValues("comment");
    const updatedValue = currentValue + emojiNative;
    form.setValue("comment", updatedValue);
  };

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
                      <TextareaAutosize
                        maxRows={5}
                        {...field}
                        onKeyDown={handleKeyDown}
                        placeholder="Say something cool.... 🔥"
                        className="flex h-[45px] w-full resize-none items-center whitespace-pre-line bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative flex h-6 w-6 items-center justify-center">
              <Image
                src="/smiley.svg"
                alt="smiley"
                width={24}
                height={24}
                className="rounded-full"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setTimeout(() => {
                    const picker = document.querySelector("em-emoji-picker");
                    if (picker && picker.shadowRoot) {
                      const preview =
                        picker.shadowRoot.querySelector("#preview");
                      if (preview) {
                        preview.style.display = "none";
                      }
                      picker.style.height = "2rem";
                    }
                  });
                }}
              />
              {showEmojiPicker && (
                <div className="absolute right-0 top-[2.5rem]  h-[2rem]">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    onClickOutside={() => setShowEmojiPicker(false)}
                    perLine={12}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
      {isLoading && <p className="pl-2 text-sc-5">Adding comment...</p>}
    </div>
  );
};

export default CommentForm;
