import GroupPost from "@/components/group-post/GroupPost";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import OutlineIcon from "@/components/icons/outline-icons";

const GroupPage = () => {
  return (
    <main className="bg-light-2_dark-2">
      <div className="pb-5">
        <div className="p-5">
          <MobileGroupSection />
        </div>
        <article>
          <GroupPost />
          <button className="regular-10 ml-5 mt-7 flex items-center gap-2.5 text-sc-3">
            See more
            <OutlineIcon.ArrowRight className="stroke-sc-3" />
          </button>
        </article>
        <aside>Place holder for meetup and podcast components</aside>
      </div>
    </main>
  );
};

export default GroupPage;
