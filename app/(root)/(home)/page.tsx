import Tags from "@/components/home-page/Tags";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import Meetups from "@/components/home-page/meetup/Meetups";
import { PostCard } from "@/components/home-page/post-card";
// import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";

export default async function Home() {
  const meetups = await getAllMeetUps();
  console.log(meetups);

  return (
    <section className="bg-gray-200">
      <PostCard />
      {/* <PinnedGroup groups={groups} /> */}
      <Meetups meetUp={meetups} />
      <Tags />
    </section>
  );
}
