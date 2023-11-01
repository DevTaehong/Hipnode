import { getAllPosts } from "@/lib/actions/post.action";

const Posts = async () => {
  const posts = await getAllPosts({});

  const post = posts[5];

  console.log(posts[5]);

  return (
    <div className="">
      <h2>{post.heading}</h2>
      <p>{post.content}</p>
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
    <div className="">
      <p>{comment.content}</p>
      <div className="">Author: {comment.author.name}</div>
      <div className="">
        {comment.replies.map((reply: any) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

const Reply = ({ reply }: any) => {
  return (
    <div className="">
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
