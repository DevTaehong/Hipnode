import { CommentContentProps } from "@/types/posts";

const CommentContent = ({ content }: CommentContentProps) => (
  <div className="flex text-[1rem] leading-[1.5rem] text-sc-3">{content}</div>
);

export default CommentContent;
