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
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import { getGroups } from "@/lib/actions/group.actions";

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
    <section className="sticky top-[5.25rem] -mt-16 flex h-full min-h-screen w-screen justify-center bg-blue-400 p-5 lg:top-0 lg:h-screen lg:max-h-screen lg:pb-[2.3rem] lg:pt-[5.875rem]">
      <div className="flex h-full w-full max-w-[44rem] flex-col gap-5 lg:max-w-[85rem] lg:flex-row">
        <div className="flex lg:w-[13.125rem]">
          <div className="flex w-full flex-col gap-5 overflow-y-auto lg:max-h-screen">
            <Sidebar />
            <div className="flex lg:hidden">
              <CreatePostInput userImage={userImage} />
            </div>

            <PopularTags tagsData={tagsData} />

            <div className="hidden lg:flex">
              <PinnedGroup groups={groups} />
            </div>
          </div>
        </div>

        <div className="flex max-h-full flex-col gap-5">
          <div className="hidden lg:flex">
            <CreatePostInput userImage={userImage} />
          </div>
          <PostCardList posts={posts} userId={userId} />
        </div>

        <div className="flex lg:max-h-screen lg:w-[20.3125rem]">
          <div className="flex flex-col gap-5 overflow-y-auto lg:max-h-screen">
            <Meetups meetUps={meetups} />
            <Podcasts podcasts={podcasts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
