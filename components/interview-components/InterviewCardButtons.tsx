import React from "react";
import Link from "next/link";
import OutlineIcon from "../icons/outline-icons";

type InterviewCardButtonsType = {
  interviewSalary: string;
  updates: number;
  websiteLink: string;
};

const InterviewCardButtons = ({
  interviewSalary,
  updates,
  websiteLink,
}: InterviewCardButtonsType) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between">
        <p className="bold-14 text-sc-2_light-2">{interviewSalary}</p>
        <p className="base-12 text-sc-3">Revenue</p>
      </div>
      <span className="mx-[1.5625rem] h-full border-[0.5px] border-l-sc-5" />
      <div className="flex flex-col justify-between">
        <p className="bold-14 text-sc-2_light-2">{updates}</p>
        <p className="base-12 text-sc-3">Updates</p>
      </div>
      <span className="mx-[1.5625rem] h-full border-[0.5px] border-l-sc-5" />
      <div className="flex flex-col justify-between">
        <Link href={websiteLink} className="flex h-full">
          <OutlineIcon.Web />
        </Link>
        <p className="base-12 text-sc-3">Website</p>
      </div>{" "}
    </div>
  );
};

export default InterviewCardButtons;
