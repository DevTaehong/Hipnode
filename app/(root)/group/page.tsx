import GroupPost from "@/components/group-post/GroupPost";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import InfiniteScroll from "@/components/InfiniteScroll";
import GroupSection from "@/components/GroupSection";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import { getPostsFromGroups } from "@/lib/actions/post.action";

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
          <div className="hidden lg:sticky lg:top-[5.88rem] lg:block lg:h-[90vh]">
            <GroupSection />
          </div>
          <MobileGroupSection />
          <article>
            <InfiniteScroll
              renderItem={GroupPost}
              initialData={posts}
              fetchData={getPostsFromGroups}
              className="mx-5 columns-1 gap-5 sm:columns-2 lg:mb-10 lg:mr-0 lg:pt-[1.88rem] 2xl:columns-3"
            />
          </article>
          <aside className="mb-5 flex flex-col lg:sticky lg:top-[4.63rem] lg:h-[90vh]">
            <Meetups meetUps={meetups} />
            <Podcasts podcasts={podcasts} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default GroupPage;
