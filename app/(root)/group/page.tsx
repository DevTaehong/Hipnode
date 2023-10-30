import GroupPost from "@/components/group-post/GroupPost";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import InfiniteScroll from "@/components/InfiniteScroll";
import GroupSection from "@/components/GroupSection";
import { getGroups } from "@/lib/actions/group.actions";

const GroupPage = async () => {
  const groups = await getGroups();

  return (
    <main className="bg-light-2_dark-2 relative">
      <div className="lg:px-5 lg:pt-[1.88rem] 2xl:mx-auto 2xl:max-w-[90rem] 2xl:px-10">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:sticky lg:top-[5.88rem] lg:block lg:h-[90vh]">
            <GroupSection />
          </div>
          <MobileGroupSection />
          <article>
            <InfiniteScroll
              renderItem={GroupPost}
              initialData={groups}
              fetchData={getGroups}
              className="mx-5 columns-1 gap-5 sm:columns-2 lg:mb-0 2xl:columns-3"
            />
          </article>
          <aside className="mx-5 flex flex-col lg:sticky lg:top-[5.88rem] lg:mx-0 lg:h-[90vh]">
            {/* NOTE - Place holder for meetup and podcast components (made in Alex's branch on the homepage) */}
            <GroupPost />
            <GroupPost />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default GroupPage;
