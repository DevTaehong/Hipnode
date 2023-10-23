"use client";

import useSound from "use-sound";
import FillIcon from "../icons/fill-icons";
import { Share2Icon } from "../icons/outline-icons";
import { Button } from "../ui/button";

import CustomButton from "../CustomButton";

const PodcastButtons = ({ url }: { url: string }) => {
  const [play, { stop }] = useSound(url);
  return (
    <div className="flex w-full items-center gap-3.5 md:gap-5">
      <CustomButton
        label="Play now"
        icon={FillIcon.Play}
        className="semibold-14 md:regular-16 items-end rounded-[1.25rem] bg-blue px-4 py-2 text-light"
        onClick={play}
      />
      <Button
        size="icon"
        className="rounded-full border border-sc-2 dark:border-sc-3"
      >
        <Share2Icon />
      </Button>
    </div>
  );
};

export default PodcastButtons;
