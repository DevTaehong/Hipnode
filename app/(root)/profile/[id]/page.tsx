import HostMeetupCard from "@/components/profile/HostMeetupCard";
import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import ContentCard from "@/components/profile/ContentCard";
import MeetupsCard from "@/components/meetup-components/MeetupsCard";
import PodcastCard from "@/components/podcast-components/PodcastCard";
import InterviewCard from "@/components/interview-components/InterviewCard";

import {
  getPerformanceData,
  getProfileData,
  getProfileHistory,
  getProfileInterviews,
  getProfileMeetups,
  getProfilePodcasts,
  getProfilePosts,
} from "@/lib/actions/profile.actions";

import { formatUserJoinedDate } from "@/lib/utils";
import { MeetUpExtended } from "@/types/meetups.index";
import { Podcast } from "@prisma/client";
import { InterviewProps } from "@/types/interview.index";
import { ProfilePosts } from "@/types";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) => {
  const user = await getProfileData(params.id);

  let result: any = [];

  switch (searchParams?.search) {
    case "posts":
      result = await getProfilePosts(params.id);
      break;
    case "meetups":
      result = await getProfileMeetups(params.id);
      break;
    case "podcasts":
      result = await getProfilePodcasts(params.id);
      break;
    case "interviews":
      result = await getProfileInterviews(params.id);
      break;
    case "history":
      result = await getProfileHistory();
      break;
    default:
      result = await getProfilePosts(params.id);
  }

  const performanceData = await getPerformanceData(params.id);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row lg:px-10 lg:py-[1.87rem]">
      {/* Profile Info */}
      <section>
        {user && (
          <ProfileInfo
            src={user?.picture}
            name={user?.username}
            title={user?.title || "No Title"}
            followers={user?._count.followers}
            following={user?._count.following}
            points={user.points}
            description={user?.bio || "No Bio"}
            website={user?.website}
            twitter={user?.twitter}
            instagram={user?.instagram}
            facebook={user?.facebook}
            profileFollowing={user?.following}
            joinedAt={formatUserJoinedDate(user?.createdAt)}
          />
        )}
      </section>

      {/* Profile Filter & Content Cards */}
      <section className="flex flex-col gap-5">
        <ProfileFilter />

        {result.length === 0 && <div>No {searchParams?.search}</div>}

        {searchParams?.search === "posts" &&
          result.map((post: ProfilePosts) => (
            <ContentCard
              key={post.id}
              contentImg={post.image}
              userImg={user?.picture}
              description={post.content}
              name={user?.username}
              createdAt={formatUserJoinedDate(post.createdAt)}
              views={post.viewCount}
              likes={post._count.likes}
              comments={post._count.comments}
              tags={post.tags}
              // TODO: Figure out how to setup logic for isHeart
              isHeart={false}
            />
          ))}

        {searchParams?.search === "meetups" &&
          result.map((meetup: MeetUpExtended) => (
            <MeetupsCard key={meetup.id} meetUp={meetup} />
          ))}

        {searchParams?.search === "podcasts" &&
          result.map((podcast: Podcast) => (
            <PodcastCard
              key={podcast.id}
              info={{
                id: podcast?.id,
                title: podcast?.title,
                details: podcast?.details,
                user: {
                  name: user?.username || "",
                  location: user?.location || "",
                  picture: user?.picture || "",
                },
              }}
            />
          ))}

        {searchParams?.search === "interviews" &&
          result.map((interview: InterviewProps) => (
            <InterviewCard key={interview?.id} interviewData={interview} />
          ))}

        {searchParams?.search === "history" && <div>history</div>}
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section className="hidden w-[20.3125rem] shrink-0 flex-col gap-5 xl:flex">
        <HostMeetupCard
          title="Start Your Interview"
          desc="Working on your own internet business? We'd love to interview you!"
          leftBtn="Code of Conduct"
          rightBtn="Submit a Story"
        />
        <Performance data={performanceData} />
      </section>
    </div>
  );
};

export default ProfilePage;
