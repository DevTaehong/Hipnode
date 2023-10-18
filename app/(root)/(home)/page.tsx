import Tags from "@/components/home-page/Tags";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import Meetups from "@/components/home-page/meetup/Meetups";
import { PostCard } from "@/components/home-page/post-card";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import Podcasts from "@/components/home-page/podcast/Podcasts";

export default async function Home() {
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  console.log(podcasts.slice(0, 2));
  return (
    <section className="bg-gray-200">
      <PostCard />
      <Meetups meetUp={meetups} />
      <Podcasts podcasts={podcasts} />
      <Tags />
    </section>
  );
}
