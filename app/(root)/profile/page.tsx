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

const ProfilePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getProfileData({});

  let result: any = [];

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
      result = await getProfilePosts();
  }

  const performanceData = await getPerformanceData();

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row">
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
          result.map((post: any) => (
            <ContentCard
              key={post?.id}
              contentImg={post?.image}
              userImg={user?.picture}
              description={post?.content}
              name={user?.username}
              createdAt={formatUserJoinedDate(post?.createdAt)}
              views={post?.viewCount}
              likes={post?._count.likes}
              comments={post?._count.comments}
              tags={post?.tags}
              // TODO: Figure out how to setup logic for isHeart
              isHeart={false}
            />
          ))}

        {searchParams?.search === "meetups" &&
          result.map((meetup: any) => (
            <MeetupsCard
              key={meetup?.id}
              meetUp={{
                id: meetup?.id,
                image: meetup?.image,
                title: meetup?.title,
                location: meetup?.location,
                summary: meetup?.summary,
                tags: meetup?.tags,
                contactEmail: meetup?.contactEmail,
                contactNumber: meetup?.contactNumber,
                responsiblePersonId: meetup?.responsiblePersonId,
                createdAt: meetup?.createdAt,
                updatedAt: meetup?.updatedAt,
                userCanEditMedia: false,
              }}
            />
          ))}

        {searchParams?.search === "podcasts" &&
          result.map((podcast: any) => (
            <PodcastCard
              key={podcast?.id}
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
          result.map((interview: any) => (
            <InterviewCard
              key={interview?.id}
              interviewData={{
                id: interview?.id,
                title: interview?.title,
                bannerImage: interview?.bannerImage,
                websiteLink: interview?.websiteLink,
                salary: interview?.salary,
                salaryPeriod: interview?.salaryPeriod,
                updates: interview?.updates,
                creator: {
                  name: user?.username || "",
                  picture: user?.picture || "",
                },
                creatorId: interview?.creatorId,
                details: interview?.details,
                createdAt: interview?.createdAt,
                updatedAt: interview?.updatedAt,
              }}
            />
          ))}

        {searchParams?.search === "history" && <div>history</div>}
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section className="hidden min-w-[315px] flex-col gap-5 xl:flex">
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
