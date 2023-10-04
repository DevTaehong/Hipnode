import { IconProps } from "@/lib/utils";

const ArrowIcon = ({ children }: IconProps) => (
  <div className="flex h-5 w-5 items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      {children}
    </svg>
  </div>
);

ArrowIcon.Left = function ArrowLeftIcon() {
  return (
    <ArrowIcon>
      <path
        d="M16 10H4M4 10L8.66667 5M4 10L8.66667 15"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowIcon>
  );
};
ArrowIcon.Right = function ArrowRightIcon() {
  return (
    <ArrowIcon>
      <path
        d="M4 10H16M16 10L11.3333 5M16 10L11.3333 15"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowIcon>
  );
};
ArrowIcon.Right = function ArrowRightIcon() {
  return (
    <ArrowIcon>
      <path
        d="M4 10H16M16 10L11.3333 5M16 10L11.3333 15"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowIcon>
  );
};

export default ArrowIcon;
