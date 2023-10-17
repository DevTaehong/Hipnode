import PostCard from "@/components/home-page/post-card/PostCard";
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import { Group } from "@prisma/client";
import Tags from "@/components/home-page/Tags";
import MeetupsCard from "@/components/home-page/MeetupsCard";
import { getFormattedDateMeetUpCard } from "@/utils";

export default async function Home() {
  const { day, monthText } = getFormattedDateMeetUpCard(meetUp.createdAt);
  console.log(day);
  console.log(monthText);
  const groups: Group[] = [
    {
      id: 1,
      createdAt: new Date(),
      details: "Sample group details 1",
      groupName: "Group 1",
      updatedAt: new Date(),
    },
    {
      id: 2,
      createdAt: new Date(),
      details: "Sample group details 2",
      groupName: "Group 2",
      updatedAt: new Date(),
    },
  ];

  return (
    <section>
      <PostCard />
      <PinnedGroup groups={groups} />
      <MeetupsCard meetUp={} />
      <Tags />
    </section>
  );
}
