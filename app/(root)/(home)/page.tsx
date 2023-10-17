import Tags from "@/components/home-page/Tags";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import Meetups from "@/components/home-page/meetup/Meetups";
import { PostCard } from "@/components/home-page/post-card";
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import { getGroupWithAllData, getAllGroups } from "@/lib/actions/post.action";

export default async function Home() {
  const meetups = await getAllMeetUps();
  console.log(meetups);
  const groups = await getGroupWithAllData(1);
  console.log(groups);
  const allGroups = await getAllGroups();
  console.log(allGroups);

  return (
    <section className="bg-gray-200">
      <PostCard />
      <PinnedGroup groups={groups} />
      <Meetups meetUp={meetups} />
      <Tags />
    </section>
  );
}
