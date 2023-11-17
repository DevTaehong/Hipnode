"use client";

import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { leaveGroup } from "@/lib/actions/group.actions";

const GroupLeaveButton = ({
  userId,
  groupId,
}: {
  userId: number;
  groupId: number;
}) => {
  const handleLeaveGroup = async () => {
    await leaveGroup(userId, groupId);
  };
  return (
    <AlertDialogAction
      className="flex h-[2.875rem] w-40 items-center justify-center 
            rounded-md bg-blue p-[0.62rem] hover:opacity-80 hover:transition-opacity"
      onClick={handleLeaveGroup}
    >
      <span className="semibold-18 text-light">Leave Group</span>
    </AlertDialogAction>
  );
};

export default GroupLeaveButton;
