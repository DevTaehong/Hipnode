import { auth } from "@clerk/nextjs";

import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAllPosts, getPopularTags } from "@/lib/actions/post.action";
import PopularTags from "@/components/home-page/tags/PopularTags";
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import { getGroups } from "@/lib/actions/group.actions";
import ResponsiveCreatePostInput from "@/components/posts/create-post-form/ResponsiveCreatePostInput";

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
  const groups = await getGroups();

  return (
    <section className="bg-light-2_dark-2 sticky top-[5.25rem] -mt-16 flex h-fit min-h-screen w-screen justify-center overflow-hidden px-5 py-20 lg:top-0 lg:h-screen lg:max-h-screen lg:py-5  lg:pb-[2.3rem] lg:pt-[5.875rem]">
      <div className="flex h-full w-full max-w-[44rem] flex-col gap-5 lg:max-w-[85rem] lg:flex-row">
        <div className="flex lg:w-[13.125rem]">
          <div className="flex w-full flex-col gap-5 overflow-y-auto lg:max-h-screen">
            <Sidebar />
            <div className="flex lg:hidden">
              <ResponsiveCreatePostInput userImage={userImage} />
            </div>
            <div className="hidden lg:flex">
              <PopularTags tagsData={tagsData} />
            </div>

            <div className="hidden lg:flex">
              <PinnedGroup groups={groups} />
            </div>
          </div>
        </div>

        <div className="flex max-h-full flex-col gap-5">
          <div className="hidden w-full lg:flex">
            <ResponsiveCreatePostInput userImage={userImage} />
          </div>
          <div className="flex w-full overflow-hidden">
            <PostCardList posts={posts} userId={userId} />
          </div>
        </div>

        <div className="flex w-full lg:max-h-screen lg:w-[20.3125rem]">
          <div className="flex w-full flex-col gap-5 overflow-y-auto sm:flex-row lg:max-h-screen lg:flex-col">
            <Meetups meetUps={meetups} />
            <Podcasts podcasts={podcasts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
