import PodcastCard from "./PodcastCard";
import { PodcastUserInfo } from "@/types/podcast.index";

type PodcastListColumnType = {
  podcasts: {
    listNumber: string;
    list: PodcastUserInfo[] | undefined;
  };
};

const PodcastListColumn = ({ podcasts }: PodcastListColumnType) => {
  return (
    <div
      className="flex h-fit flex-col gap-5 xl:w-full"
      key={podcasts.listNumber}
    >
      {podcasts.list &&
        podcasts.list.map((podcast) => (
          <PodcastCard key={podcast.id} info={podcast} />
        ))}
    </div>
  );
};

export default PodcastListColumn;
