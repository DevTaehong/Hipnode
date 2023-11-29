"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FillIcon from "../icons/fill-icons";
import NotificationPopover from "../notificationPopover/NotificationPopover";
import { dummyNotifications } from "@/constants";

const NotificationButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <FillIcon.Notification
            className="fill-sc-4 dark:fill-sc-6"
            notification
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <NotificationPopover notifications={dummyNotifications} />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
