"use client";

import { PostFormValuesType } from "@/constants/posts";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface CreatePostContextType {
  imagePreviewUrl: string | null;
  setImagePreviewUrl: Dispatch<SetStateAction<string | null>>;
  previewValues: PostFormValuesType | null;
  setPreviewValues: Dispatch<SetStateAction<PostFormValuesType | null>>;
  clearEditor: boolean;
  setClearEditor: Dispatch<SetStateAction<boolean>>;
  podcastPreviewUrl: string | null;
  setPodcastPreviewUrl: Dispatch<SetStateAction<string | null>>;
}

const CreatePostContext = createContext<CreatePostContextType | undefined>(
  undefined
);

export function CreatePostProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [previewValues, setPreviewValues] = useState<PostFormValuesType | null>(
    null
  );
  const [clearEditor, setClearEditor] = useState<boolean>(false);
  const [podcastPreviewUrl, setPodcastPreviewUrl] = useState<string | null>(
    null
  );

  const contextValue: CreatePostContextType = {
    imagePreviewUrl,
    setImagePreviewUrl,
    previewValues,
    setPreviewValues,
    clearEditor,
    setClearEditor,
    podcastPreviewUrl,
    setPodcastPreviewUrl,
  };

  return (
    <CreatePostContext.Provider value={contextValue}>
      {children}
    </CreatePostContext.Provider>
  );
}

export function useCreatePostContext() {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error(
      "useCreatePostContext must be used within a CreatePostProvider"
    );
  }
  return context;
}
