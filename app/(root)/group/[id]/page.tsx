import FormLink from "@/components/FormLink";
import ActiveMembers from "@/components/group-detail-page/active-members/ActiveMembers";
import Explore from "@/components/group-detail-page/Explore";
import GroupAbout from "@/components/group-detail-page/GroupAbout";
import GroupAdmins from "@/components/group-detail-page/GroupAdmins";
import GroupCover from "@/components/group-detail-page/GroupCover";
import GroupDetailPost from "@/components/group-detail-page/group-detail-post/GroupDetailPost";
import Tags from "@/components/home-page/tags/Tags";
import { groupFormLinkProps } from "@/constants";
import RecentMedia from "@/components/group-detail-page/RecentMedia";
import { getGroupById } from "@/lib/actions/group.actions";
import { getPostsByGroupId } from "@/lib/actions/post.action";
import InfiniteScroll from "@/components/InfiniteScroll";

const GroupDetailPage = async ({ params }: { params: { id: string } }) => {
  const groupId = Number(params.id);
  const group = await getGroupById({ groupId });
  const posts = await getPostsByGroupId(groupId);

  return (
    <main className="bg-light-2_dark-2">
      <div className="flex flex-col gap-5 p-5 lg:flex-row lg:py-0 xl:px-10 2xl:mx-auto 2xl:max-w-[90rem]">
        <section className="flex flex-col gap-5 lg:h-screen lg:max-w-[49.0625rem] lg:grow lg:overflow-y-auto lg:pt-[1.875rem]">
          <GroupCover group={group} />
          <FormLink {...groupFormLinkProps} className="flex lg:hidden" />
          <Explore />
          <InfiniteScroll
            initialData={posts}
            fetchData={getPostsByGroupId}
            renderItem={GroupDetailPost}
            className="flex flex-col gap-5"
            groupId={groupId}
          />
        </section>

        <aside
          className="flex flex-col gap-5 lg:order-last lg:h-screen 
          lg:max-w-[20.3125rem] lg:grow lg:flex-col lg:overflow-y-auto lg:py-[1.875rem]
          "
        >
          <FormLink {...groupFormLinkProps} className="hidden lg:flex" />
          <ActiveMembers members={group?.members ?? []} />
          <RecentMedia media={group?.posts ?? []} />
        </aside>

        <aside className="flex flex-col gap-5 lg:order-first lg:h-screen lg:max-w-[13.125rem] lg:overflow-y-auto lg:py-[1.875rem]">
          <GroupAbout />
          <GroupAdmins />
          <Tags className="px-0" />
        </aside>
      </div>
    </main>
  );
};

export default GroupDetailPage;
