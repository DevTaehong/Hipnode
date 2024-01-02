import {
  getFastestGrowingGroups,
  getMostPopularGroups,
  getNewlyLaunchedGroups,
} from "@/lib/actions/group.actions";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getPostsFromGroups } from "@/lib/actions/post.action";

import GroupPost from "@/components/group-page/group-post/GroupPost";
import MobileGroupSection from "@/components/group-page/mobileGroupSection/MobileGroupSection";
import InfiniteScroll from "@/components/InfiniteScroll";

import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import GroupSection from "@/components/group/GroupSection";

const GroupPage = async () => {
  const [meetups, podcasts, posts] = await Promise.all([
    getAllMeetUps(),
    getAllPodcastsWithUserInfo(),
    getPostsFromGroups(),
  ]);

  return (
    <div className="flex flex-col gap-y-5 p-5 lg:flex-row lg:gap-y-0 lg:p-0 lg:px-10 2xl:mx-auto 2xl:max-w-[90rem]">
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:block lg:h-screen lg:overflow-y-auto 
          lg:pb-[1.875rem] lg:pt-[6.875rem]"
      >
        <GroupSection
          fastestGrowingGroupsPromise={getFastestGrowingGroups()}
          newlyLaunchedGroupsPromise={getNewlyLaunchedGroups()}
          mostPopularGroupsPromise={getMostPopularGroups()}
        />
      </div>

      <MobileGroupSection
        fastestGrowingGroupsPromise={getFastestGrowingGroups()}
        newlyLaunchedGroupsPromise={getNewlyLaunchedGroups()}
        mostPopularGroupsPromise={getMostPopularGroups()}
      />

      <article
        className="lg:h-screen lg:overflow-y-auto lg:py-[1.875rem] 
        lg:pl-[14.375rem] lg:pr-[21.5625rem]"
      >
        <InfiniteScroll
          renderItem={GroupPost}
          initialData={posts}
          fetchData={getPostsFromGroups}
          className="columns-1 gap-5 sm:columns-2 2xl:columns-3"
        />
      </article>

      <aside
        className="mb-[5.5rem] flex flex-col gap-5 sm:flex-row md:mb-5 lg:fixed lg:inset-y-0 
          lg:right-[max(2.5rem,calc(50%-42.5rem))] lg:h-screen lg:w-[20.3125rem] lg:flex-col 
          lg:overflow-y-auto lg:px-0 lg:pb-[1.875rem] lg:pt-[6.875rem]"
      >
        <Meetups meetUps={meetups} />
        <Podcasts podcasts={podcasts} />
      </aside>
    </div>
  );
};

export default GroupPage;
