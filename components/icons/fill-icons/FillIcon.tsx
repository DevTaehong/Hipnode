import { ReactNode } from "react";
import { BusinessIcon, CalendarIcon, CommentIcon, NotificationIcon } from ".";

interface FillIconProps {
  children?: ReactNode;
  className?: string;
  notifcation?: boolean;
}

const FillIcon = ({ children, className }: FillIconProps) => {
  const styles = className || "fill-[#C5D0E6] dark:fill-[#F4F6F8]";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={styles}
    >
      {children}
    </svg>
  );
};

FillIcon.BusinessIcon = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className || "fill-[#FF571A]"}>
      <BusinessIcon />
    </FillIcon>
  );
};

FillIcon.CalendarIcon = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className}>
      <CalendarIcon />
    </FillIcon>
  );
};

FillIcon.CommentIcon = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className || "fill-[#97989D]"}>
      <CommentIcon />
    </FillIcon>
  );
};

FillIcon.NotificationIcon = function Icon({ className, notifcation }: FillIconProps) {
  return (
    <FillIcon className={className || "fill-[#858EAD] dark:fill-[#F4F6F8]"}>
      <NotificationIcon notifcation={notifcation} />
    </FillIcon>
  );
};

export default FillIcon;
