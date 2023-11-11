import ActiveMembers from "@/components/group-detail-page/active-members/ActiveMembers";
import GroupAbout from "@/components/group-detail-page/GroupAbout";
import GroupAdmins from "@/components/group-detail-page/GroupAdmins";
import GroupCover from "@/components/group-detail-page/GroupCover";
import { getGroupById } from "@/lib/actions/group.actions";

const GroupDetailPage = async ({ params }: { params: { id: string } }) => {
  const groupId = Number(params.id);
  const group = await getGroupById({ groupId });

  return (
    <div className="bg-light-2_dark-2 flex flex-col gap-5 p-5">
      <GroupCover group={group} />
      <GroupAbout />
      <GroupAdmins />
      <ActiveMembers members={group?.members ?? []} />
    </div>
  );
};

export default GroupDetailPage;
