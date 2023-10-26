import GroupPost from "@/components/GroupPost";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import { ArrowIcon } from "@/components/icons/outline-icons";

const GroupPage = async () => {
  return (
    <main className="bg-light-2_dark-2">
      <div className="pb-5">
        <div className="p-5">
          <MobileGroupSection />
        </div>
        <article className="">
          <GroupPost />
          <button className="regular-10 ml-5 mt-7 flex items-center gap-2.5 text-sc-3">
            See more
            <ArrowIcon.Right className="stroke-sc-3" />
          </button>
        </article>
        <aside className=""></aside>
      </div>
    </main>
  );
};

export default GroupPage;
