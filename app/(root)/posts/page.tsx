import { getAllPosts } from "@/lib/actions/post.action";

const Posts = async () => {
  const posts = await getAllPosts({});

  const post = posts[5];

  console.log(posts[2]);

  return (
    <div className="" style={{ color: "red" }}>
      <h2>
        <span className="text-[1.2rem] font-bold">Heading : </span>
        {post.heading}
      </h2>
      <p>
        <span className="text-[1.2rem] font-bold">Content : </span>
        {post.content}
      </p>
      <div className="">Author: {post.author.name}</div>
      <div className="">
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="">
        Tags: {post?.tags.map((tag) => tag.name).join(", ")}
      </div>
    </div>
  );
};

const Comment = ({ comment }: any) => {
  return (
    <div className="" style={{ color: "green", marginLeft: "20px" }}>
      <label className="text-[1.2rem] font-bold">Comment:</label>
      <p>{comment.content}</p>
      <div className="">Author: {comment.author.name}</div>
      <div className="">
        {comment.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

const Reply = ({ reply }: any) => {
  return (
    <div className="" style={{ color: "blue", marginLeft: "40px" }}>
      <label>Reply:</label>
      <p>{reply.content}</p>
      <div className="">Author: {reply?.author?.name}</div>
    </div>
  );
};

// const AllPosts = ({ post }: any) => {
//   return (
//     <div className="">
//       {post.map((post: any) => (
//         <Posts key={post.id} post={post} />
//       ))}
//     </div>
//   );
// };

export default Posts;
