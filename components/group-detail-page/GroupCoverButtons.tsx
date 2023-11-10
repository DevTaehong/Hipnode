import GroupLeaveButton from "@/components/group-detail-page/GroupLeaveButton";
import MoreButton from "@/components/group-detail-page/MoreButton";

const GroupCoverButtons = ({
  isGroupOwner,
  groupId,
}: {
  isGroupOwner: boolean;
  groupId: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <GroupLeaveButton />
      {isGroupOwner && <MoreButton groupId={groupId} />}
    </div>
  );
};

export default GroupCoverButtons;
