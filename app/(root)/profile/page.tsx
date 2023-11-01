import ContentCard from "@/components/profile/ContentCard";
import HostMeetupCard from "@/components/profile/HostMeetupCard";
import PerformanceCard from "@/components/profile/PerformanceCard";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import { profileData } from "@/constants";

const ProfilePage = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row">
      {/* Profile Info */}
      <section>
        <ProfileInfo
          src={profileData.src}
          name={profileData.name}
          title={profileData.title}
          followers={profileData.followers.length}
          points={profileData.points}
          following={profileData.following}
          description={profileData.description}
          website={profileData.website}
          socials={profileData.socials}
          joinedAt={profileData.joinedAt}
        />
      </section>

      {/* Profile Filter & Content Cards */}
      <section className="flex flex-col gap-5">
        <ProfileFilter />

        <ContentCard
          contentImg="/postCardPlacholder.png"
          userImg="/images/emoji_2.png"
          desc="Bitcoin has tumbled from its record high of $58,000 after words
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
      <section className="hidden">
        <HostMeetupCard />
        <PerformanceCard />
      </section>
    </div>
  );
};

export default ProfilePage;
