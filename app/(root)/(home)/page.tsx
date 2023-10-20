import { auth } from "@clerk/nextjs";

import Tags from "@/components/home-page/Tags";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import CreatePostInput from "@/components/home-page/CreatePostInput";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAllPosts } from "@/lib/actions/post.action";
import "@/components/home-page/home.css";

export default async function Home() {
  const { userId } = auth();
  let userImage: string = "";
  if (userId) {
    const user = await getUserByClerkId(userId);
    userImage = user?.picture || "/public/emoji.png";
  }
  const meetups = await getAllMeetUps();
  const podcasts = await getAllPodcastsWithUserInfo();
  const posts = await getAllPosts({});

  return (
    <section className="min-h-screen w-full bg-light-2 pt-16 dark:bg-dark-2 ">
      <div className="wrapper-home mx-auto  max-w-[85rem] scroll-smooth">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="tags">
          <Tags />
        </div>
        <div className="create">
          <CreatePostInput userImage={userImage} />
        </div>
        <div className="list no-scrollbar max-h-[screen] overflow-scroll">
          <PostCardList posts={posts} />
        </div>

        <div className="meetups">
          <Meetups meetUps={meetups} />{" "}
        </div>
        <div className="podcasts">
          <Podcasts podcasts={podcasts} />
        </div>
      </div>
    </section>
  );
}
