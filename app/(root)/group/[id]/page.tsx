import GroupAbout from "@/components/group-detail-page/GroupAbout";
import GroupAdmins from "@/components/group-detail-page/GroupAdmins";

const GroupDetailPage = () => {
  return (
    <div className="bg-light-2_dark-2 flex h-screen flex-col gap-5 p-5">
      <GroupAbout />
      <GroupAdmins />
    </div>
  );
};

export default GroupDetailPage;
