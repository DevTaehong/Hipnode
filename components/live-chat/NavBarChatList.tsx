"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";

import FillIcon from "../icons/fill-icons";
import NavBarChatListItem from "./NavBarChatListItem";
import { UserChatroomProps } from "@/types/searchbar.index";
import { NotificationType } from "@/types/chatroom.index";
import { getUnreadNotifications } from "@/lib/actions/chatroom.actions";
import { LoaderComponent } from "../onboarding-components";
import { supabase } from "@/utils/supabaseClient";
import useChatStore from "@/app/chatStore";

const NavBarChatList = ({
  userChatrooms,
}: {
  userChatrooms: UserChatroomProps[];
}) => {
  const { userInfo, showChat, chatroomId } = useChatStore();
  const [hover, setHover] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const path = usePathname();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (notifications.length === 0) {
      setIsNewNotification(false);
    }
  }, [notifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const unreadNotifications = await getUnreadNotifications();
        if (unreadNotifications) {
          setNotifications(unreadNotifications);
        }
      } catch (error) {
        console.log("There was an error fetching your notifications", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [isOpen]);

  if (path === "/chat") {
    return (
      <div className="rounded-md bg-red p-2.5">
        <FillIcon.Message className="fill-white" />
      </div>
    );
  }

  const isActiveOrHovered = path === "/chat" || hover || isNewNotification;
  const chatIconBackgroundColor = isActiveOrHovered
    ? "bg-red"
    : "bg-sc-6 dark:bg-dark-4";
  const chatIconFillColor = isActiveOrHovered
    ? "fill-white"
    : "fill-sc-4 dark:fill-sc-6";

  const getNotificationsForChatroom = (chatroomId: number) => {
    return (
      notifications.filter(
        (notification) => notification.chatroomId === chatroomId
      )[0] || null
    );
  };

  /* @ts-ignore */
  const handleChange = (payload) => {
    const isRelevantNotification = userChatrooms.some(
      (chatroom) =>
        chatroom.id === payload.new.chatroomId &&
        payload.new.receiverUserId === userInfo.id
    );

    const isChatOpenForNotification =
      showChat && chatroomId === payload.new.chatroomId;

    if (isRelevantNotification && !isChatOpenForNotification) {
      setIsNewNotification(true);
    }
  };

  supabase
    .channel("ChatNotification")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "ChatNotification" },
      handleChange
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "ChatNotification" },
      handleChange
    )
    .subscribe();

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={`rounded-md p-2.5 ${chatIconBackgroundColor}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FillIcon.Message className={chatIconFillColor} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-light_dark-4 mt-4 flex w-full min-w-[18rem] max-w-[21rem] flex-col gap-4 rounded-lg py-5 shadow-md">
          <h2 className="semibold-18 text-sc-2_light-2 px-5">Messages</h2>
          <ul className="flex h-full max-h-[18.125rem] w-full flex-col overflow-auto">
            {isLoading ? (
              <div className="flex-center h-full w-full">
                <LoaderComponent />
              </div>
            ) : (
              userChatrooms.map((chatroom) => (
                <NavBarChatListItem
                  key={chatroom.id}
                  chatroom={chatroom}
                  notification={getNotificationsForChatroom(chatroom.id)}
                />
              ))
            )}
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
