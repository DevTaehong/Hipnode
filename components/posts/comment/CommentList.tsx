import Comment from "./Comment";

interface CommentProps {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  author: {
    picture: string;
    username: string;
  };
}

interface CommentListProps {
  comments: CommentProps[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="">
          <Comment {...comment} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
