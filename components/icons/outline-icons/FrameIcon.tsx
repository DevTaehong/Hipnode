import { IconProps } from "@/types";

const FrameIcon = ({ children }: IconProps) => (
  <div className="flex h-5 w-5 items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="11"
      viewBox="0 0 15 11"
      fill="none"
    >
      {children}
    </svg>
  </div>
);

FrameIcon.Center = function FrameIconCenter() {
  return (
    <FrameIcon>
      <path
        d="M3 4H12"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1 1H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1 7H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H12"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </FrameIcon>
  );
};

FrameIcon.Left = function FrameIconLeft() {
  return (
    <FrameIcon>
      <path
        d="M10 4H1"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M13 1H1"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M13 7H1"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M10 10H1"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </FrameIcon>
  );
};

FrameIcon.Right = function FrameIconRight() {
  return (
    <FrameIcon>
      <path
        d="M5 4H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 1H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 7H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M5 10H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </FrameIcon>
  );
};

FrameIcon.Point = function FrameIconPoint() {
  return (
    <FrameIcon>
      <path
        d="M5 4H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 4H3"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M5 1H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 1H3"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M5 7H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 7H3"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M5 10H14"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M2 10H3"
        className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </FrameIcon>
  );
};

export default FrameIcon;
