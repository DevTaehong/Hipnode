import { Dispatch, SetStateAction } from "react";

import { PodcastUserInfo } from "@/types/podcast.index";
import { MeetUpExtended } from "@/types/meetups.index";
import { InterviewProps } from "@/types/interview.index";
import OutlineIcon from "@/components/icons/outline-icons";

interface SeeMoreButtonProps {
  array: InterviewProps[] | PodcastUserInfo[] | MeetUpExtended[] | undefined;
  setLoadMore: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const SeeMoreButton = ({
  array,
  setLoadMore,
  className,
}: SeeMoreButtonProps) => {
  return (
    <button
      className={`${className} flex w-fit items-center gap-2.5 lg:hidden ${
        array && array.length < 20 && "hidden lg:hidden"
      }`}
      onClick={() => setLoadMore(true)}
    >
      <p className="text-sc-3">See More</p>
      <OutlineIcon.ArrowRight className="stroke-sc-3" />
    </button>
  );
};

export default SeeMoreButton;
