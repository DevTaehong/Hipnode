const Dot = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={className ?? "fill-sc-5"}
    >
      <circle cx="3" cy="3" r="2.5" />
    </svg>
  );
};

export default Dot;
