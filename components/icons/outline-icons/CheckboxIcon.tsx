interface CheckboxIconProps {
  checked?: boolean;
}

const CheckboxIcon = ({ checked = false }: CheckboxIconProps) => {
  return (
    <div className="flex h-5 w-5 items-center justify-center">
      {checked ? (
        <div className="flex h-4 w-4 items-center justify-center self-center rounded-sm bg-[#FF4401]">
          <svg
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector 20"
              d="M1 4.5L4 7L9 1"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="14"
            rx="1"
            stroke="#97989D"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckboxIcon;
