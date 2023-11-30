import { z } from "zod";
import { create } from "zustand";

import { postFormValidationSchema } from "@/lib/validations";
import { PostFormDefaultValues } from "@/constants/posts";

export type PostFormValuesType = z.infer<typeof postFormValidationSchema>;

type CreatePostStore = {
  imagePreviewUrl: string | null;
  setImagePreviewUrl: (url: string | null) => void;
  previewValues: PostFormValuesType | null;
  setPreviewValues: (values: PostFormValuesType | null) => void;
  clearEditor: boolean;
  setClearEditor: (value: boolean) => void;
};

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  imagePreviewUrl: null || "",
  setImagePreviewUrl: (url) => set({ imagePreviewUrl: url }),
  previewValues: PostFormDefaultValues,
  setPreviewValues: (values) => set({ previewValues: values }),
  clearEditor: false,
  setClearEditor: (value) => set({ clearEditor: value }),
}));
