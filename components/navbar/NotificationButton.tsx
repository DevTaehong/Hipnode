"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FillIcon from "../icons/fill-icons";
import NotificationPopover from "../notificationPopover/NotificationPopover";

const NotificationButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <FillIcon.Notification
            className="fill-sc-4 dark:fill-sc-6"
            notifcation
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <NotificationPopover />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
