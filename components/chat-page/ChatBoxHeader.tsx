import Image from "next/image";
import Link from "next/link";

import { ChatBoxHeaderProps } from "@/types/chatroom.index";

const ChatBoxHeader = ({ otherUser, isUserOnline }: ChatBoxHeaderProps) => {
  const userOnlineStatus = isUserOnline ? (
    <span className="semibold-12 text-green">Online</span>
  ) : (
    <span className="semibold-12 text-sc-4">Offline</span>
  );

  return (
    <header className="flex w-full items-center justify-between bg-light-2 px-4 py-3 dark:bg-dark-2 md:px-6 md:py-5">
      <figure className="relative flex gap-3 md:gap-4">
        <Image
          src={otherUser.image}
          alt={`profile image for ${otherUser.name}`}
          height={56}
          width={56}
          className="h-14 w-14 shrink-0 rounded-full"
        />
        <figcaption className="flex flex-col justify-between whitespace-nowrap">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:gap-2">
            <span className="bold-14 md:bold-18 text-sc-2_light">
              {otherUser.name}
            </span>
            {userOnlineStatus}
          </div>
          <p className="regular-12 md:regular-14 text-sc-4 dark:text-light-2">
            @{otherUser.username}
          </p>
        </figcaption>
      </figure>
      <Link
        href={`/profile/${otherUser.id}`}
        className="semibold-14 flex-center shrink-0 rounded-md bg-red-80 px-3 py-2 text-light md:px-4 md:py-3"
      >
        View Profile
      </Link>
    </header>
  );
};

export default ChatBoxHeader;
