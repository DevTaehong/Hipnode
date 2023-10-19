import { Podcast, Shows } from "@prisma/client";
import Categories from "./Categories";
import PodcastCard from "./PodcastCard";
import SeeAllPodcasts from "./SeeAllPodcasts";

interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

interface PodcastPageFilterProps {
  allPodcasts: PodcastUserInfo[] | undefined;
  allShows: Shows[];
}

const PodcastPageFilter = ({
  allPodcasts,
  allShows,
}: PodcastPageFilterProps) => {
  const oddPodcasts = allPodcasts?.filter((_, index) => index % 2 !== 0);
  const evenPodcasts = allPodcasts?.filter((_, index) => index % 2 === 0);

  const shows = allShows.slice(0, 8);
  const podcastLength = allPodcasts?.length;

  return (
    <>
      <section className="flex w-full md:w-[13.125rem] ">
        <Categories shows={shows} />
      </section>
      <section className="flex w-full flex-col">
        <div className="relative flex w-full">
          <div className="absolute h-6 w-full bg-gradient-to-t from-transparent to-light-2 dark:to-dark-2" />
          <div className="absolute bottom-0 h-6 w-full bg-gradient-to-t from-light-2 to-transparent dark:from-dark-2" />
          <section className="no-scrollbar flex w-full flex-col gap-5 pb-10 md:h-screen md:overflow-scroll xl:flex-row ">
            <div className="flex h-fit flex-col gap-5 xl:w-full">
              {evenPodcasts &&
                evenPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} info={podcast} />
                ))}
            </div>
            <div className="flex h-fit flex-col gap-5 xl:w-full">
              {oddPodcasts &&
                oddPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} info={podcast} />
                ))}
            </div>
          </section>
        </div>
        <SeeAllPodcasts podcastLength={podcastLength} />
      </section>
    </>
  );
};

export default PodcastPageFilter;
