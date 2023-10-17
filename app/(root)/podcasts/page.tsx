import { getPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import PodcastCard from "@/components/PodcastCard";
import Categories from "@/components/Categories";
import HostMeetup from "@/components/HostMeetup";

const Podcasts = async () => {
  const allPodcasts = await getPodcastsWithUserInfo();

  const oddPodcasts = allPodcasts
    .slice(0, 20)
    .filter((_, index) => index % 2 !== 0);
  const evenPodcasts = allPodcasts
    .slice(0, 20)
    .filter((_, index) => index % 2 === 0);

  return (
    <main className="bg-light-2_dark-2 flex min-h-screen w-screen justify-center p-5 md:py-[1.875rem]">
      <div className=" flex max-w-[85rem] flex-col gap-5 md:flex-row">
        <section className="flex w-full md:w-[13.5rem] xl:w-[18%]">
          <Categories />
        </section>
        <section className="no-scrollbar flex w-full flex-col gap-5 pb-20 md:h-screen md:w-1/2 md:overflow-scroll xl:w-[58%] xl:flex-row ">
          <div className="flex h-fit flex-col gap-5">
            {oddPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} info={podcast} />
            ))}
          </div>
          <div className="flex h-fit flex-col gap-5">
            {evenPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} info={podcast} />
            ))}
          </div>
        </section>
        <section className="flex w-full md:w-1/3 xl:w-[24%]">
          <HostMeetup
            title="Host a Meetup"
            description="Find other Hipnoders in your area so you can learn, share and work together"
            buttonOne="Code of Conduct"
            buttonTwo="Host a Meetup"
          />
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
