import ContentCard from "@/components/profile/ContentCard";
import HostMeetupCard from "@/components/profile/HostMeetupCard";
import PerformanceCard from "@/components/profile/PerformanceCard";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";

// TODO: Replace this with data from the API
// ! Keeping it here for now to make it easier to work on the UI and implement database intergration later
const profileData = {
  src: "/emoji_2.png",
  name: "AR. Jakir",
  title: "User Interface Designer",
  points: "880",
  description:
    "Hey there... I'm AR Jakir! I'm here to learn from and support the other members of this community!",
  website: "https://google.com",
  joinedAt: "joined 2 years ago",
  followers: [
    {
      name: "Tye1",
      src: "/emoji_2.png",
      link: "/profile-page",
    },
    {
      name: "Tye2",
      src: "/emoji_2.png",
      link: "/profile-page",
    },
  ],
  following: [
    {
      id: "1",
      name: "Tye1",
      src: "/emoji_2.png",
      link: "/profile-page1",
    },
    {
      id: "2",
      name: "Tye2",
      src: "/emoji_2.png",
      link: "/profile-page2",
    },
    {
      id: "3",
      name: "Tye3",
      src: "/emoji_2.png",
      link: "/profile-page3",
    },
    {
      id: "4",
      name: "Tye4",
      src: "/emoji_2.png",
      link: "/profile-page4",
    },
    {
      id: "5",
      name: "Tye5",
      src: "/emoji_2.png",
      link: "/profile-page5",
    },
    {
      id: "6",
      name: "Tye6",
      src: "/emoji_2.png",
      link: "/profile-page6",
    },
    {
      id: "7",
      name: "Tye7",
      src: "/emoji_2.png",
      link: "/profile-page7",
    },
  ],
  socials: [
    {
      name: "Twitter",
      link: "https://twitter.com/",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/",
    },
    {
      name: "Instagram",
      link: "https://instagram.com/",
    },
  ],
};

const Page = () => {
  return (
    <div className="flex flex-col justify-center gap-5 bg-light-2 p-5 dark:bg-dark-2 md:flex-row">
      {/* Profile Info */}
      <section className="">
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
      <section className="">
        <ProfileFilter />
        <ContentCard />
      </section>

      {/* HostMeetup Card & Performance Card */}
      <section className="">
        <HostMeetupCard />
        <PerformanceCard />
      </section>
    </div>
  );
};

export default Page;
