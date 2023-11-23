import { auth } from "@clerk/nextjs";

import GroupForm from "@/components/group-form/GroupForm";
import {
  getAllUsers,
  getUserByClerkId,
  getUserById,
} from "@/lib/actions/user.actions";

const CreateGroupPage = async () => {
  const users = await getAllUsers();
  const { userId: clerkId } = await auth();

  let user;

  if (clerkId) user = await getUserByClerkId(clerkId);

  // NOTE - To add a user to a group as an admin, member, and creator, get the user data
  const currentUser = await getUserById(user?.id ?? -1);

  if (!currentUser) throw new Error("User not found");

  return (
    <div className="bg-light-2_dark-2">
      <div className="p-5 sm:pt-[1.875rem]">
        <GroupForm users={users} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default CreateGroupPage;
