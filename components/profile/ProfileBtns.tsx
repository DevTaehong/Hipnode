"use client";

import { Button } from "../ui/button";
import FillIcon from "@/components/icons/fill-icons";

const ProfileBtns = () => {
  return (
    <div className="mt-5 flex justify-center gap-2.5">
      <Button
        className="bg-blue p-2.5 px-9 py-1 text-[1rem] font-semibold leading-[1.5rem] text-light"
        onClick={() => {}}
      >
        Follow
      </Button>

      <div
        className="flex cursor-pointer items-center justify-center rounded-lg bg-blue-10 p-2.5 dark:bg-dark-4"
        onClick={() => {}}
      >
        <FillIcon.Message className="fill-blue" />
      </div>
    </div>
  );
};

export default ProfileBtns;
