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
    <div className="flex flex-col">
      <h2 className="base-9 md:regular-12 text-sc-2 dark:text-light-2">
        {showName} &bull; Episode {episodeNumber}
      </h2>
      <h3 className="semibold-14 md:semibold-18 mb-2.5 text-sc-2 dark:text-light-2 md:mb-4">
        by {creatorName}
      </h3>
    </div>
  );
};

export default PodcastEpisodeInfo;
