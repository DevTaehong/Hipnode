"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/utils/supabaseClient";
import FillIcon from "../icons/fill-icons";
import NotificationPopoverContent from "../notificationPopover/NotificationPopoverContent";
import { updateNotificationLastChecked } from "@/lib/actions/user.actions";
import {
  getNotificationsByUserId,
  getUncheckedNotifications,
} from "@/lib/actions/notification.actions";
import { NotificationPopoverButtonProps, NotificationProps } from "@/types";

const NotificationPopoverButton = ({
  className,
  sideOffset,
  alignOffset,
  currentUserId,
  lastChecked,
}: NotificationPopoverButtonProps) => {
  const pathName = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isUserChecked, setIsUserChecked] = useState<boolean>();
  const [notificationData, setNotificationData] = useState<NotificationProps[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const notifications = await getNotificationsByUserId(currentUserId);
      const isUserChecked = notifications.some(
        (notification) => notification.createdAt > lastChecked
      );
      setIsUserChecked(isUserChecked);
      setNotificationData(notifications);
    })();
  }, [currentUserId, lastChecked]);

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Notification",
          filter: `userId=eq.${currentUserId}`,
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedNotificationId = (payload.old as NotificationProps).id;
            setNotificationData((prevNotificationData) =>
              prevNotificationData.filter(
                (notification) => notification.id !== deletedNotificationId
              )
            );
            const uncheckedNotifications = await getUncheckedNotifications(
              currentUserId,
              lastChecked
            );

            const isUserChecked = uncheckedNotifications.length > 0;
            if (isPopoverOpen === false) setIsUserChecked(isUserChecked);

            return;
          }

          if (payload.eventType === "UPDATE") {
            const updatedNotification = payload.new as NotificationProps;
            setNotificationData((prevNotificationData) =>
              prevNotificationData.map((notification) =>
                notification.id === updatedNotification.id
                  ? updatedNotification
                  : notification
              )
            );
            return;
          }

          if (payload.eventType === "INSERT") {
            // NOTE - when the popover is open, the user is checking the notifications. So, no unchecked mark needed
            if (isPopoverOpen === false) setIsUserChecked(true);
            const newNotification = payload.new as NotificationProps;
            setNotificationData((prevNotificationData) => [
              ...prevNotificationData,
              newNotification,
            ]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, isPopoverOpen, lastChecked]);

  const handlePopoverClick = (open: boolean) => {
    updateNotificationLastChecked(currentUserId, pathName);
    setIsUserChecked(false);
    setIsPopoverOpen(open);
  };

  console.log(isPopoverOpen);

  return (
    <Popover onOpenChange={(open) => handlePopoverClick(open)}>
      <PopoverTrigger asChild className={className}>
        <div className="cursor-pointer xl:rounded-lg xl:bg-light-2 xl:p-2 dark:xl:bg-dark-4">
          <FillIcon.Notification
            className="fill-sc-4 dark:fill-sc-6"
            notification={isUserChecked}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={sideOffset}
        align="end"
        alignOffset={alignOffset}
        className="w-full"
        avoidCollisions={false}
      >
        <NotificationPopoverContent
          notificationData={notificationData}
          setIsPopoverOpen={setIsPopoverOpen}
        />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopoverButton;
