import { auth } from "@clerk/nextjs";

import Tags from "@/components/home-page/Tags";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import CreatePostInput from "@/components/home-page/CreatePostInput";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
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
  const posts = await getAllPosts({});

  return (
    <section className="flex w-full bg-light-2 py-[1.875rem] pt-16 dark:bg-dark-2">
      <div className="mx-auto flex max-w-[85rem] flex-col lg:flex-row">
        <div className="flex h-fit  flex-col gap-5 lg:sticky lg:top-[4rem]">
          <Sidebar />
          <div className="w-full lg:hidden">
            <CreatePostInput userImage={userImage} />
          </div>
          <div className="hidden w-full lg:block">
            <Tags />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="hidden lg:block">
            <CreatePostInput userImage={userImage} />
          </div>
          <div className="flex h-full overflow-scroll">
            <PostCardList posts={posts} />
          </div>
        </div>

        <div className="flex h-fit flex-col gap-5 lg:sticky lg:top-[4rem]">
          <Meetups meetUps={meetups} />
          <Podcasts podcasts={podcasts} />
        </div>
      </div>
    </section>
  );
}
