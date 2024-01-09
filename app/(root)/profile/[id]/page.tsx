import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import {
  getPerformanceData,
  getProfileData,
  getProfileHistory,
  getProfileInterviews,
  getProfileMeetups,
  getProfilePodcasts,
} from "@/lib/actions/profile.actions";

import { formatUserJoinedDate } from "@/lib/utils";
import { PostCardList } from "@/components/home-page/post-card";
import {
  getAllPostsByUserId,
  isFollowingUser,
} from "@/lib/actions/post.action";
import { ExtendedPrismaPost } from "@/types/posts";
import MeetupsList from "@/components/profile/MeetupsList";
import PodcastsList from "@/components/profile/PodcastsList";
import InterviewsList from "@/components/profile/InterviewsList";
import FormLink from "@/components/FormLink";
import { interviewFormLinkProps } from "@/constants/interview";
import HistoryList from "@/components/profile/HistoryList";
import NotFound from "@/components/NotFound";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) => {
  const user = await getProfileData(params.id);

  if (!user?.username) {
    return <NotFound isProfilePage />;
  }

  let result: any = [];

  switch (searchParams.search) {
    case "posts":
      result = await getAllPostsByUserId({
        numberToSkip: 0,
        authorId: params.id,
      });
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
      result = await getProfileHistory(params.id);
      break;
    default:
      break;
  }

  const performanceData = await getPerformanceData(params.id);

  const isFollowing = await isFollowingUser(user.id);

  if (!result) return;

  const isEmpty =
    result.length === 0 || (result.data && result.data.length === 0);

  return (
    <div className="mx-auto mt-[-5rem] flex min-h-screen w-full max-w-[49rem] flex-col justify-center gap-5 bg-light-2 p-5 pb-20 pt-[6.25rem] dark:bg-dark-2 md:sticky md:h-screen md:flex-row md:overflow-hidden md:pb-0 lg:max-w-[90rem] lg:px-10">
      <section>
        <ProfileInfo
          userId={user.id}
          src={user.picture}
          username={user.username}
          isFollowing={isFollowing}
          isLoggedInUser={user.isLoggedInUser}
          title={user.title || "No Title"}
          followers={user?._count?.followers}
          following={user?._count?.following}
          points={user.points}
          description={user.bio || "No Bio"}
          website={user.website}
          twitter={user.twitter}
          instagram={user.instagram}
          facebook={user.facebook}
          profileFollowing={user?.following}
          joinedAt={formatUserJoinedDate(user.createdAt)}
        />
      </section>

      {/* Profile Filter & Content Cards */}
      <section className="flex flex-1 flex-col gap-5">
        <ProfileFilter />

        {isEmpty && (
          <div className="flex justify-center text-base text-sc-1 dark:text-light md:text-lg">
            No {searchParams?.search}
          </div>
        )}

        {searchParams?.search === "posts" && result.length !== 0 && (
          <PostCardList
            posts={result as ExtendedPrismaPost[]}
            authorId={user.id}
          />
        )}

        {searchParams?.search === "meetups" && result.data.length !== 0 && (
          <MeetupsList
            data={result}
            authorId={params.id}
            resultType={searchParams.search}
          />
        )}

        {searchParams?.search === "podcasts" && result.data.length !== 0 && (
          <PodcastsList
            data={result}
            authorId={params.id}
            resultType={searchParams.search}
          />
        )}

        <div className="relative flex w-full flex-1 overflow-auto">
          {searchParams?.search === "interviews" &&
            result.data.length !== 0 && (
              <InterviewsList
                data={result}
                authorId={params.id}
                resultType={searchParams.search}
              />
            )}
        </div>

        {searchParams?.search === "history" && result.data.length !== 0 && (
          <HistoryList data={result} authorId={params.id} />
        )}
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section className="hidden w-[20.3125rem] shrink-0 flex-col gap-5 xl:flex">
        <FormLink {...interviewFormLinkProps} className="hidden lg:flex" />
        <Performance data={performanceData} />
      </section>
    </div>
  );
};

export default ProfilePage;
