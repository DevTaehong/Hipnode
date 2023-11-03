import { z } from "zod";
import React, { ReactNode } from "react";

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
  htmlString: string;
  onSubmitPreview: () => void;
};

export type IconBlockProps = {
  label: string;
  count?: number;
  IconComponent: React.ElementType;
};

export type PostIconsProps = {
  children: ReactNode;
};

export type MoreInformationItemProps = {
  item: { title: string; tags: string };
};

export type ColumnWrapperType = {
  children: React.ReactNode;
};

export type PostImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PostTitleProps = {
  title: string;
};

export type TagsListProps = {
  tags: string[];
};

export type PostDescriptionProps = {
  description: string;
};

export type CommentBoxProps = {
  placeholder: string;
  value: string;
};