"use client";

import OutlineIcon from "@/components/icons/outline-icons";

const page = () => {
  return (
    <div className="m-5 flex gap-5 bg-slate-200 p-5">
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
    </div>
  );
};

export default page;
