import { ExtendedPost } from "@/types/models.index";

import { PostCard } from ".";

type PostCardListProps = {
  posts: ExtendedPost[];
};

const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <main>
      {posts.slice(0, 5).map((post) => (
        <section className="pb-[1.25rem]" key={post.id}>
          <PostCard post={post} />
        </section>
      ))}
    </main>
  );
};

export default PostCardList;
