import { Podcast, Shows } from "@prisma/client";
import Categories from "./Categories";
import PodcastCard from "./PodcastCard";

interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

interface PodcastPageFilterProps {
  allPodcasts: PodcastUserInfo[];
  allShows: Shows[];
}

const PodcastPageFilter = ({
  allPodcasts,
  allShows,
}: PodcastPageFilterProps) => {
  const oddPodcasts = allPodcasts
    .slice(0, 20)
    .filter((_, index) => index % 2 !== 0);
  const evenPodcasts = allPodcasts
    .slice(0, 20)
    .filter((_, index) => index % 2 === 0);

  const shows = allShows.slice(0, 8);

  return (
    <>
      <section className="flex w-full md:w-[13.5rem] xl:w-[18%]">
        <Categories shows={shows} />
      </section>
      <section className="no-scrollbar flex w-full flex-col gap-5 pb-20 md:h-screen md:w-1/2 md:overflow-scroll xl:w-[58%] xl:flex-row ">
        <div className="flex h-fit flex-col gap-5 xl:w-full">
          {oddPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} info={podcast} />
          ))}
        </div>
        <div className="flex h-fit flex-col gap-5 xl:w-full">
          {evenPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} info={podcast} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PodcastPageFilter;
