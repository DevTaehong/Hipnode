import Tags from "@/components/home-page/Tags";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import Meetups from "@/components/home-page/meetup/Meetups";
import { PostCard } from "@/components/home-page/post-card";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import CreatePostInput from "@/components/home-page/CreatePostInput";
import { auth } from "@clerk/nextjs";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import Sidebar from "@/components/home-page/sidebar/Sidebar";
export default async function Home() {
  const { userId } = auth();
  let userImage: string = "";
  if (userId) {
    const user = await getUserByClerkId(userId);
    userImage = user?.picture || "/public/emoji.png";
  }
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  console.log(podcasts.slice(0, 2));
  return (
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center gap-10 p-12">
        <CreatePostInput userImage={userImage} />
        <Sidebar />
      </div>

      <PostCard />
      <Meetups meetUp={meetups} />
      <Podcasts podcasts={podcasts} />
      <Tags />
    </section>
  );
}
