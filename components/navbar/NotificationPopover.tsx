import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FillIcon from "../icons/fill-icons";
import NotificationPopover from "../notificationPopover/NotificationPopover";
import { dummyNotifications } from "@/constants";

const NotificationPopoverButton = ({
  className,
  sideOffset,
  alignOffset,
}: {
  className: string;
  sideOffset: number;
  alignOffset: number;
}) => (
  <Popover>
    <PopoverTrigger asChild className={className}>
      <div className="cursor-pointer xl:rounded-lg xl:bg-light-2 xl:p-2 dark:xl:bg-dark-4">
        <FillIcon.Notification
          className="fill-sc-4 dark:fill-sc-6"
          notification
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
      <NotificationPopover notifications={dummyNotifications} />
    </PopoverContent>
  </Popover>
);

export default NotificationPopoverButton;
