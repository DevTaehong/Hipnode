const CheckmarkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        className={`${className ?? "fill-[#347AE2]"}`}
        d="M6.41632 16.2872C6.80713 16.6803 7.44309 16.6805 7.83415 16.2877L17.9797 6.09648C18.5456 5.52803 18.5461 4.60923 17.9808 4.04022C17.4109 3.46669 16.4832 3.46633 15.9129 4.03943L7.12938 12.8666L4.09077 9.815C3.52124 9.24303 2.59525 9.24303 2.02572 9.815C1.45992 10.3832 1.45958 11.3018 2.02496 11.8705L6.41632 16.2872Z"
      />
    </svg>
  );
};

export default CheckmarkIcon;
