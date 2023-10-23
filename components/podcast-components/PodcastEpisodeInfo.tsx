import { Progress } from "../ui/progress";

type PodcastEpisodeInfoType = {
  showName: string;
  episodeNumber: number;
  creatorName: string;
};

const PodcastEpisodeInfo = ({
  showName,
  episodeNumber,
  creatorName,
}: PodcastEpisodeInfoType) => {
  return (
    <>
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
    </>
  );
};

export default PodcastEpisodeInfo;
