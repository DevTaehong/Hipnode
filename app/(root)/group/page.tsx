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
    <main className="bg-light-2_dark-2">
      <div className="lg:pl-5 2xl:mx-auto 2xl:max-w-[90rem] 2xl:px-10">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:sticky lg:top-[5.755rem] lg:block lg:h-[90vh]">
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
          <article>
            <InfiniteScroll
              renderItem={GroupPost}
              initialData={posts}
              fetchData={getPostsFromGroups}
              className="mx-5 columns-1 gap-5 sm:columns-2 lg:mb-10 lg:mr-0 lg:pt-[1.88rem] 2xl:columns-3"
            />
          </article>
          <aside className="mb-5 flex flex-col gap-5 p-5 lg:sticky lg:top-[4.63rem] lg:h-[90vh]">
            <Meetups meetUps={meetups} />
            <Podcasts podcasts={podcasts} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default GroupPage;
