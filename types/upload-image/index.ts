import { ChangeEvent, ReactNode } from "react";

export interface ImageUploadProps {
  bucketName?: string;
  folderName?: string;
  onFileSelected: (file: File) => void;
  children: ReactNode;
}

export interface UseImageUploadReturn {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

export type InputChangeEvent<T = HTMLInputElement> = ChangeEvent<T>;
