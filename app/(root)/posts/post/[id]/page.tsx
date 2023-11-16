import PostPageContent from "@/components/posts/post-by-id/PostPageContent";
import { getPostById } from "@/lib/actions/post.action";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const postData = await getPostById(+id);
  return <PostPageContent postData={postData} />;
};

export default PostPage;
