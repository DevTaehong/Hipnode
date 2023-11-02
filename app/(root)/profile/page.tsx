import ContentCard from "@/components/profile/ContentCard";
import HostMeetupCard from "@/components/profile/HostMeetupCard";
import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

import { profileData, performanceData } from "@/constants";

const ProfilePage = () => {
  return (
    <div className="flex flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row">
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
      <section>
        <ProfileFilter />
        <ContentCard />
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section>
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
