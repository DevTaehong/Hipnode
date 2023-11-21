import GroupLeaveModal from "@/components/group-detail-page/GroupLeaveModal";
import MoreButton from "@/components/group-detail-page/MoreButton";

const GroupCoverButtons = ({
  isGroupOwner,
  groupId,
  userId,
}: {
  isGroupOwner: boolean;
  groupId: number;
  userId: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <GroupLeaveModal userId={userId} groupId={groupId} />
      {isGroupOwner && <MoreButton groupId={groupId} />}
    </div>
  );
};

export default GroupCoverButtons;
