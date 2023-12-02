import Image from "next/image";
import Link from "next/link";

import { ChatBoxHeaderProps } from "@/types/chatroom.index";

const ChatBoxHeader = ({ otherUser, isUserOnline }: ChatBoxHeaderProps) => {
  const userOnlineStatus = isUserOnline ? (
    <p className="semibold-12 text-green">Online</p>
  ) : (
    <p className="semibold-12 text-sc-4">Offline</p>
  );

  return (
    <div className="flex w-full items-center justify-between bg-light-2 px-6 py-8 dark:bg-dark-2">
      <div className="relative flex h-14 w-14 gap-4">
        <Image
          src={otherUser.image}
          alt={`profile image for ${otherUser.name}`}
          height={56}
          width={56}
          className="shrink-0 rounded-full"
        />
        <div className="flex flex-col justify-between whitespace-nowrap">
          <div className="flex items-center gap-2">
            <p className="bold-18 text-sc-2_light">{otherUser.name}</p>
            {userOnlineStatus}
          </div>
          <p className="regular-14 text-sc-4 dark:text-light-2">
            @{otherUser.username}
          </p>
        </div>
      </div>
      <Link
        href={`/profile/${otherUser.id}`}
        className="semibold-14 flex-center h-[2.875rem] w-[6.5rem] rounded-md bg-red-80 text-light"
      >
        View Profile
      </Link>
    </div>
  );
};

export default ChatBoxHeader;
