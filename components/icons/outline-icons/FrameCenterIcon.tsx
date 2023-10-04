const FrameCenterIcon = () => {
  return (
    <div className="flex h-5 w-5 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
      >
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
      </svg>
    </div>
  );
};

export default FrameCenterIcon;
