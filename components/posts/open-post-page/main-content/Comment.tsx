interface AuthorProps {
  name: string;
  picture: string;
}

interface CommentProps {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  author?: AuthorProps;
}

const Comment = ({
  id,
  content,
  authorId,
  postId,
  parentId,
  createdAt,
  updatedAt,
  isEdited,
  author,
}: CommentProps) => {
  console.log({
    author,
  });
  return (
    <div className="mb-[1.25rem] flex flex-col gap-[1.25rem] px-12">
      <div className="rounded-2xl border border-solid border-sc-5">
        {content}
      </div>
    </div>
  );
};

export default Comment;
