import { auth } from "@clerk/nextjs";

import Podcasts from "@/components/home-page/podcast/Podcasts";
import CreatePostInput from "@/components/home-page/CreatePostInput";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAllPosts, getPopularTags } from "@/lib/actions/post.action";
import PopularTags from "@/components/home-page/tags/PopularTags";

const Home = async () => {
  const { userId: clerkUserId } = auth();
  let userImage: string = "";
  let userId: number = 0;
  if (clerkUserId) {
    const user = await getUserByClerkId(clerkUserId);
    if (!user) return null;
    userImage = user.picture ?? "/public/emoji.png";
    userId = user.id;
  }
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  const posts = await getAllPosts({});
  const tagsData = await getPopularTags();

  return (
    <section className="flex h-full w-full bg-light-2 px-5 dark:bg-dark-2">
      <div className="mx-auto flex max-w-[85rem] flex-col gap-5 pt-5 lg:flex-row">
        <div className="flex h-fit flex-col gap-5  lg:sticky lg:top-[4rem]">
          <Sidebar />
          <div className="w-full lg:hidden">
            <CreatePostInput userImage={userImage} />
          </div>
          <div className="hidden w-full lg:block">
            <PopularTags tagsData={tagsData} />
          </div>
        </div>

        <div className="flex  h-full flex-col gap-5">
          <div className="hidden lg:block">
            <CreatePostInput userImage={userImage} />
          </div>
          <div className="flex h-full overflow-scroll">
            <PostCardList posts={posts} userId={userId} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 sm:flex-row lg:sticky lg:top-[4rem] lg:h-fit lg:w-[20.3125rem] lg:flex-col">
          <Meetups meetUps={meetups} />
          <Podcasts podcasts={podcasts} />
        </div>
      </div>
    </section>
  );
};

export default Home;
