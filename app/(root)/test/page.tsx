"use client";

import OutlineIcon from "@/components/icons/outline-icons";

const page = () => {
  return (
    <div className="m-5 flex items-center gap-5 bg-slate-100 p-5">
      <OutlineIcon.Checkbox />
      <OutlineIcon.Checkbox checked />
      <OutlineIcon.Dev />
      <OutlineIcon.Following />
      <OutlineIcon.Headline />
      <OutlineIcon.Underline />
      <OutlineIcon.Italic />
      <OutlineIcon.Strikethrough />
      <OutlineIcon.Bold />
      <OutlineIcon.Checkmark />
      <OutlineIcon.FrameCenter />
      <OutlineIcon.FrameNumber
        strokeColor="stroke-red-500"
        fillColor="fill-red-500 dark:fill-[#F7F7F7]"
      />
      <OutlineIcon.Heart />
      <OutlineIcon.Mention />
    </div>
  );
};

export default page;
