import Podcasts from "@/components/home-page/podcast/Podcasts";
import GroupPost from "@/components/GroupPost";
import Meetups from "@/components/home-page/meetup/Meetups";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
// import { getAllPosts } from "@/lib/actions/post.action";
import "@/components/home-page/home.css";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import { ArrowIcon } from "@/components/icons/outline-icons";

const GroupPage = async () => {
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  // const posts = await getAllPosts({});

  return (
    <main className="bg-light-2_dark-2">
      <div className="pb-5">
        <div className="p-5">
          <MobileGroupSection />
        </div>
        <article className="">
          <GroupPost />
          <button className="regular-10 ml-5 mt-7 flex items-center gap-2.5 text-sc-3">
            See more
            <ArrowIcon.Right className="stroke-sc-3" />
          </button>
        </article>
        <aside className="">
          <Meetups meetUps={meetups} /> <Podcasts podcasts={podcasts} />
        </aside>
      </div>
    </main>
  );
};

export default GroupPage;
