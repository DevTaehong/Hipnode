import GroupPost from "@/components/GroupPost";
import MobileGroupSection from "@/components/mobileGroupSection/MobileGroupSection";
import { ArrowIcon } from "@/components/icons/outline-icons";
import InfiniteScroll from "@/components/InfiniteScroll";
// import { getAllPosts } from "@/lib/actions/post.action";
import { getGroups } from "@/lib/actions/group.actions";

const GroupPage = async () => {
  const groups = await getGroups();
  return (
    <main className="bg-light-2_dark-2">
      <div className="pb-5">
        <div className="p-5">
          <MobileGroupSection />
        </div>
        <article className="">
          <InfiniteScroll
            fetchData={getGroups}
            initialData={groups}
            renderItem={(item) => <GroupPost key={item.id} {...item} />}
          />
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
