import Image from "next/image";

import OutlineIcon from "../icons/outline-icons";
import { formatInterviewDate } from "@/utils";
import { InterviewHeaderProps } from "@/types/interview.index";

const InterviewHeader = ({
  userImage,
  username,
  date,
}: InterviewHeaderProps) => {
  const interviewDate = formatInterviewDate(date);

  return (
    <header className="flex w-full justify-between">
      <div className="flex gap-4">
        <Image
          src={userImage}
          height={40}
          width={40}
          alt="user image"
          className="h-10 w-10 rounded-full md:h-11 md:w-11"
        />
        <div className="flex flex-col">
          <strong className="semibold-14 sm:semibold-16 ">{username}</strong>
          <time className="base-12 sm:base-14 text-sc-3">{interviewDate}</time>
        </div>
      </div>
      <OutlineIcon.MoreVertical />
    </header>
  );
};

export default InterviewHeader;
