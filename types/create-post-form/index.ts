import { z } from "zod";

import { postFormValidationSchema } from "@/lib/validations";
import { Control, UseFormReturn } from "react-hook-form";

export type PostFormValuesType = z.infer<typeof postFormValidationSchema>;

export type CoverImageUploadProps = {
  control: Control<PostFormValuesType>;
  setImagePreviewUrl: (url: string) => void;
  setImageToUpload: (file: File) => void;
};

export interface FromFieldProps {
  control: Control<PostFormValuesType>;
  form: UseFormReturn<PostFormValuesType>;
}

export type CreatePostTitleProps = {
  control: Control<PostFormValuesType>;
};

export type SelectControllerProps = {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  placeholder: string;
  options: string[];
};

export type PostPreviewProps = {
  imagePreviewUrl: string;
  htmlString: string;
  onSubmitPreview: () => void;
  previewValues?: PostFormValuesType | null;
};
