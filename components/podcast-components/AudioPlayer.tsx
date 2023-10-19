import { Podcast } from "@prisma/client";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import CustomButton from "../CustomButton";
import FillIcon from "../icons/fill-icons";
import { Button } from "../ui/button";
import { Share2Icon } from "../icons/outline-icons";

interface IPodcast extends Podcast {
  user: {
    name: string;
  };
  show: {
    name: string;
  };
}

const AudioPlayer = ({ podcast }: { podcast: IPodcast }) => {
  const {
    image,
    episodeNumber,
    url,
    user: { name: creatorName },
    show: { name: showName },
  } = podcast;
  console.log(url);
  return (
    <section className="flex h-[8.625rem] w-full justify-between gap-2 rounded-2xl bg-light p-3.5 dark:bg-dark-3 md:h-[11.875rem] md:gap-0 md:p-5">
      <div className="flex h-fit">
        <div className="flex h-full max-h-[3.125rem] min-h-[3.125rem] w-full min-w-[3.125rem] max-w-[3.125rem] md:min-h-[9.375rem] md:min-w-[9.375rem]">
          <Image
            src={image}
            alt="Podcast Image"
            height={150}
            width={150}
            className="z-10 rounded-lg"
          />
        </div>
        <div className="flex h-full max-h-[2.5rem] min-h-[2.5rem] w-full min-w-[2.5rem] max-w-[2.5rem] -translate-x-2.5 self-center md:min-h-[8.125rem] md:min-w-[8.125rem] md:-translate-x-8">
          <Image
            src="/images/record-player.svg"
            alt="Podcast Image"
            height={130}
            width={130}
          />
        </div>
      </div>
      <div className="flex-1 flex-col">
        <h3 className="base-9 md:regular-12 text-sc-2 dark:text-light-2">
          {showName} &bull; Episode {episodeNumber}
        </h3>
        <h2 className="semibold-14 md:semibold-18 mb-2.5 text-sc-2 dark:text-light-2 md:mb-4">
          by {creatorName}
        </h2>
        <div className="mb-2.5 flex w-full items-center gap-5 md:mb-4">
          <Progress value={33} className="flex-1" />
          <p className="regular-10 md:semibold-14 text-sc-2 dark:text-light-2">
            00:00 | 63:37
          </p>
        </div>
        <div className="flex w-full items-center gap-3.5 md:gap-5">
          <CustomButton
            label="Play now"
            icon={FillIcon.Play}
            className="semibold-14 md:regular-16 items-end rounded-[1.25rem] bg-blue px-4 py-2 text-light"
          />
          <Button
            size="icon"
            className="rounded-full border border-sc-2 dark:border-sc-3"
          >
            <Share2Icon />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
