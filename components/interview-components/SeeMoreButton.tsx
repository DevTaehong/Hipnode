import { Dispatch, SetStateAction } from "react";

import { InterviewPageFilterProps } from "@/constants/interview";
import { PodcastUserInfo } from "@/types/podcast.index";
import OutlineIcon from "../icons/outline-icons";

interface SeeMoreButtonProps {
  array: InterviewPageFilterProps[] | PodcastUserInfo[] | undefined;
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
