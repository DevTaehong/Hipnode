"use client";

import OutlineIcon from "../icons/outline-icons";

const MarkAllReadButton = () => {
  // TODO - Implement this function to mark all notifications as read
  const handleMarkAllRead = () => {
    console.log("Mark all read");
  };
  return (
    <button
      onClick={handleMarkAllRead}
      className="flex h-9 w-[8.25rem] items-center justify-center gap-2.5 rounded-md bg-blue-10 px-2.5 
        py-[0.4375rem] hover:opacity-80 hover:transition-opacity dark:bg-dark-3 xl:h-[2.375rem] xl:w-36"
    >
      <OutlineIcon.Checkmark />{" "}
      <span className="semibold-14 xl:semibold-16 text-blue dark:text-blue-80">
        Mark All Read
      </span>
    </button>
  );
};

export default MarkAllReadButton;
