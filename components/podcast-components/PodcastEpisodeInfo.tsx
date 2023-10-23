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
    </>
  );
};

export default PodcastEpisodeInfo;
