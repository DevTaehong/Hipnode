const SearchIcon = () => {
  return (
    <div className="flex h-5 w-5 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <circle
          cx="9"
          cy="9"
          r="8"
          className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
          strokeWidth="2"
        />
        <path
          d="M14.5 15.5L18.5 19.5"
          className="stroke-[#3F4354] dark:stroke-[#F7F7F7]"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SearchIcon;
