import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import GroupForm from "@/components/group-form/GroupForm";
import {
  getAllUsers,
  getUserByClerkId,
  getUserById,
} from "@/lib/actions/user.actions";

const CreateGroupPage = async () => {
  const users = await getAllUsers();

  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/sign-in");

  const user = await getUserByClerkId(clerkId);
  if (!user) redirect("/sign-in");

  // NOTE - To add a user to a group as an admin, member, and creator, get the user data
  const currentUser = await getUserById(user.id);
  if (!currentUser) redirect("/sign-in");

  return (
    <div className="bg-light-2_dark-2">
      <div className="p-5 sm:pt-[1.875rem]">
        <GroupForm users={users} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default CreateGroupPage;
