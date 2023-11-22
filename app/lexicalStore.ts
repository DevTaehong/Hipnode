import { z } from "zod";
import { create } from "zustand";

import { postFormValidationSchema } from "@/lib/validations";
import { POST_FORM_DEFAULT_VALUES } from "@/constants/posts";
import { CommentAuthorProps } from "@/types/posts";

export type PostFormValuesType = z.infer<typeof postFormValidationSchema>;

type CommentsByParentId = {
  [parentId: string | "null"]: CommentAuthorProps[];
};

type CreatePostStore = {
  imagePreviewUrl: string | null;
  setImagePreviewUrl: (url: string | null) => void;
  previewValues: PostFormValuesType | null;
  setPreviewValues: (values: PostFormValuesType | null) => void;
  clearEditor: boolean;
  setClearEditor: (value: boolean) => void;
  commentsByParentId: CommentsByParentId;
  setCommentsByParentId: (comments: CommentsByParentId) => void;
  currentLoggedInUser: number | null;
  setCurrentLoggedInUser: (user: number | null) => void;
};

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  imagePreviewUrl: null || "",
  setImagePreviewUrl: (url) => set({ imagePreviewUrl: url }),
  previewValues: POST_FORM_DEFAULT_VALUES,
  setPreviewValues: (values) => set({ previewValues: values }),
  clearEditor: false,
  setClearEditor: (value) => set({ clearEditor: value }),
  commentsByParentId: {},
  setCommentsByParentId: (comments) => set({ commentsByParentId: comments }),
  currentLoggedInUser: null,
  setCurrentLoggedInUser: (user) => set({ currentLoggedInUser: user }),
}));
