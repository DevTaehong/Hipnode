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
        <ContentCard />
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section>
        <HostMeetupCard />
        <PerformanceCard />
      </section>
    </div>
  );
};

export default ProfilePage;
