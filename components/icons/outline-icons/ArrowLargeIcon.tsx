import { IconProps } from "@/types";

const ArrowLargeIcon = ({ children }: IconProps) => {
  return (
    <div className="flex h-5 w-5 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        {children}
      </svg>
    </div>
  );
};

ArrowLargeIcon.Down = function ArrowLargeDown() {
  return (
    <ArrowLargeIcon>
      <path
        d="M19 5.5L10 14.5L1 5.5"
        className="stroke-[#3F4354] dark:stroke-sc-3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowLargeIcon>
  );
};
ArrowLargeIcon.Right = function ArrowLargeRight() {
  return (
    <ArrowLargeIcon>
      <path
        d="M5.5 1L14.5 10L5.5 19"
        className="stroke-[#3F4354] dark:stroke-sc-3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowLargeIcon>
  );
};

export default ArrowLargeIcon;
