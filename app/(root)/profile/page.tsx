import HostMeetupCard from "@/components/profile/HostMeetupCard";
import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import MeetupsCard from "@/components/meetup-components/MeetupsCard";
import PodcastCard from "@/components/podcast-components/PodcastCard";
import InterviewCard from "@/components/interview-components/InterviewCard";

import { ProfileResults } from "@/types";

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
import { Podcast } from "@prisma/client";
import { InterviewProps } from "@/types/interview.index";

import { MeetUpExtended } from "@/types/meetups.index";
import { isInterview, isMeetUpExtended, isPodcast } from "@/utils/typeguards";

export const dynamic = "force-dynamic";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getProfileData();

  let result: ProfileResults = [];

  switch (searchParams?.search) {
    case "posts":
      result = await getProfilePosts();
      break;
    case "meetups":
      result = await getProfileMeetups();
      break;
    case "podcasts":
      result = await getProfilePodcasts();
      break;
    case "interviews":
      result = await getProfileInterviews();
      break;
    case "history":
      result = await getProfileHistory();
      break;
    default:
  }

  const performanceData = await getPerformanceData();

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
      <section className="flex w-full flex-col gap-5">
        <ProfileFilter />

        {result.length === 0 && <div>No {searchParams?.search}</div>}

        {searchParams?.search === "meetups" &&
          result.map((item) => {
            if (isMeetUpExtended(item))
              return <MeetupsCard key={item.id} meetUp={item} />;

            return null;
          })}

        {searchParams?.search === "podcasts" &&
          result.map((item) => {
            if (isPodcast(item)) {
              return (
                <PodcastCard
                  key={item?.id}
                  info={{
                    id: item.id,
                    title: item.title,
                    details: item.details,
                    user: {
                      name: user?.username || "",
                      location: user?.location || "",
                      picture: user?.picture || "",
                    },
                  }}
                />
              );
            }
            return null;
          })}

        {searchParams?.search === "interviews" &&
          result.map((item) => {
            if (isInterview(item)) {
              return <InterviewCard key={item.id} interviewData={item} />;
            }
            return null;
          })}

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
