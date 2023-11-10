import { useContext } from "react";
import { PostContextType } from "@/types/posts";
import { PostContext } from "@/context/posts-context/PostContext";

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
