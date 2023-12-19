import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import { formatInterviewDate } from "@/utils";
import { InterviewHeaderProps } from "@/types/interview.index";
import MediaEditActionPopover from "../action-popover/MediaEditActionPopover";

const InterviewHeader = ({
  userImage,
  username,
  date,
  id,
  clerkId,
}: InterviewHeaderProps) => {
  const interviewDate = formatInterviewDate(date);
  const { userId } = useAuth();

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
      {userId === clerkId && (
        <MediaEditActionPopover label="Interview" mediaId={id} />
      )}
    </header>
  );
};

export default InterviewHeader;
