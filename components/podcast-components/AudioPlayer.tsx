import AudioPlayerImage from "./AudioPlayerImage";
import PodcastEpisodeInfo from "./PodcastEpisodeInfo";
import PodcastPlayButton from "./PodcastPlayButton";
import { IPodcast } from "@/types/podcast.index";

const AudioPlayer = ({ podcast, url }: { podcast: IPodcast; url: string }) => {
  const {
    image,
    episodeNumber,
    user: { name: creatorName },
    show: { name: showName },
  } = podcast;
  return (
    <section className="flex h-[8.625rem] w-full justify-between gap-2 rounded-2xl bg-light p-3.5 dark:bg-dark-3 md:h-[11.875rem] md:gap-0 md:p-5">
      <AudioPlayerImage imageSrc={image} />
      <div className="flex-1 flex-col">
        <PodcastEpisodeInfo
          showName={showName}
          episodeNumber={episodeNumber}
          creatorName={creatorName}
        />
        <PodcastPlayButton url={url} podcast={podcast} />
      </div>
    </section>
  );
};

export default AudioPlayer;