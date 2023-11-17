import Image from "next/image";
import { auth } from "@clerk/nextjs";

import { Group } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions";
import GroupCoverButtons from "@/components/group-detail-page/GroupCoverButtons";

const GroupCover = async ({ group }: { group: Group | null }) => {
  const groupOwner = await getUserById(group?.createdBy ?? -1);
  const { userId: clerkId } = auth();

  const user = await getUserByClerkId(clerkId ?? "");
  const isGroupOwner = groupOwner?.id === user?.id;

  return (
    <div className="bg-light_dark-3 flex flex-col gap-3.5 rounded-2xl p-2.5 sm:h-[18.375rem] sm:gap-5">
      <Image
        className="max-h-[4.5rem] w-full rounded-[0.625rem] object-cover sm:max-h-[10.875rem]"
        src={group?.coverImage ?? "/images/hidnode.svg"}
        alt={`${group?.name} cover image`}
        width={315}
        height={72}
      />
      <div className="flex flex-row items-center justify-between sm:px-2.5">
        <div className="flex flex-row items-center gap-3.5">
          <Avatar className="h-10 w-10 sm:h-[4.375rem] sm:w-[4.375rem]">
            <AvatarImage
              src={group?.logo ?? "/images/hidnode.svg"}
              alt={`${group?.name} logo`}
            />
            <AvatarFallback>{group?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="regular-16 sm:semibold-26 text-sc-2 dark:text-light-2">
              {group?.name}
            </p>
            <p className="regular-10 sm:regular-14 flex items-start gap-0.5 text-sc-3">
              Create by
              <span className="semibold-12 sm:semibold-14 text-sc-2 dark:text-light-2">{` ${groupOwner?.username}`}</span>
            </p>
          </div>
        </div>
        <GroupCoverButtons
          isGroupOwner={isGroupOwner}
          groupId={group?.id ?? -1}
          userId={user?.id ?? -1}
        />
      </div>
    </div>
  );
};

export default GroupCover;
