"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import FillIcon from "../icons/fill-icons";
import { usePathname } from "next/navigation";

import NavBarChatListItem from "./NavBarChatListItem";
import { UserChatroomProps } from "@/types/searchbar.index";

const NavBarChatList = ({
  userChatrooms,
}: {
  userChatrooms: UserChatroomProps[];
}) => {
  const [hover, setHover] = useState(false);
  const path = usePathname();

  const isActiveOrHovered = path === "/chat" || hover;
  const chatIconBackgroundColor = isActiveOrHovered
    ? "bg-red"
    : "bg-sc-6 dark:bg-dark-4";
  const chatIconFillColor = isActiveOrHovered
    ? "fill-white"
    : "fill-sc-4 dark:fill-sc-6";

  if (path === "/chat") {
    return (
      <div className="rounded-md bg-red p-2.5">
        <FillIcon.Message className="fill-white" />
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        className={`rounded-md p-2.5 ${chatIconBackgroundColor}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FillIcon.Message className={chatIconFillColor} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-light_dark-4 flex max-w-[21rem] flex-col gap-4 rounded-lg py-5">
          <h2 className="semibold-18 text-sc-2_light-2 px-5">Messages</h2>
          <ul className="flex max-h-[18.125rem] flex-col overflow-auto">
            {userChatrooms.map((chatroom) => (
              <NavBarChatListItem key={chatroom.id} chatroom={chatroom} />
            ))}
          </ul>
          <Link href="/chat" className="semibold-14 self-center text-blue">
            See all in Messenger
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavBarChatList;
