import { currentUser } from "@clerk/nextjs";

import ContentCard from "@/components/profile/ContentCard";
import HostMeetupCard from "@/components/profile/HostMeetupCard";
import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import { profileData, performanceData } from "@/constants";

import { getProfileDataByClerkId } from "@/lib/actions/profile.actions";

import { formatUserJoinedDate } from "@/lib/utils";

const ProfilePage = async () => {
  const clerkUser = await currentUser();

  const user = await getProfileDataByClerkId(clerkUser?.id);

  const profileFollowings = user?.following.map((following) => ({
    id: following.id,
    name: following.username,
    src: following.picture,
  }));

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row">
      {/* Profile Info */}
      <section>
        <ProfileInfo
          src={user?.picture}
          name={user?.username}
          title={user?.title}
          followers={user?.followBy.length}
          points={user?.points}
          following={profileFollowings}
          description={user?.bio}
          website={user?.website}
          // TODO: SEED DATA BASE TO TEST SOCIALS
          socials={profileData.socials}
          joinedAt={formatUserJoinedDate(user?.createdAt)}
        />
      </section>

      {/* Profile Filter & Content Cards */}
      <section className="flex flex-col gap-5">
        <ProfileFilter />

        <ContentCard
          contentImg="/postCardPlacholder.png"
          userImg="/images/emoji_2.png"
          description="Bitcoin has tumbled from its record high of $58,000 after words
          from three wise men and women..."
          tags={["payment", "seo", "crypto"]}
          views={100}
          likes={100}
          comments={100}
          isHeart={true}
          name="Pavel Gvay"
          createdAt="1 day ago"
        />
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
