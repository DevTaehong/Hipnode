import { auth } from "@clerk/nextjs";

import Tags from "@/components/home-page/Tags";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import CreatePostInput from "@/components/home-page/CreatePostInput";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { PostCard } from "@/components/home-page/post-card";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAllPosts } from "@/lib/actions/post.action";

export default async function Home() {
  const { userId } = auth();
  let userImage: string = "";
  if (userId) {
    const user = await getUserByClerkId(userId);
    userImage = user?.picture || "/public/emoji.png";
  }
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  const posts = await getAllPosts();

  return (
    <section className="w-full bg-light-2 dark:bg-dark-2">
      <div className="mx-auto max-w-[85rem]">
        <CreatePostInput userImage={userImage} />
        <PostCardList posts={posts} />
        <Meetups meetUps={meetups} />
        <Podcasts podcasts={podcasts} />
        <Tags />
      </div>
    </section>
  );
}
