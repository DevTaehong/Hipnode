import {
  getPodcastsWithUserInfo,
  getFilterPodcastsUserInfo,
} from "@/lib/actions/podcast.actions";
import { getAllShows } from "@/lib/actions/show.actions";
import HostMeetup from "@/components/HostMeetup";
import PodcastPageFilter from "@/components/podcast-components/PodcastPageFilter";
import Categories from "@/components/podcast-components/Categories";

interface PodcastsProps {
  show: string | string[];
  amount: string;
}

const Podcasts = async ({ searchParams }: { searchParams: PodcastsProps }) => {
  let allPodcasts;
  let showAmount;

  if (!searchParams || Object.keys(searchParams).length === 0) {
    showAmount = 20;
    allPodcasts = await getPodcastsWithUserInfo(showAmount);
  } else if (searchParams.show) {
    let showStrings = searchParams.show;
    if (!Array.isArray(showStrings)) {
      showStrings = [showStrings];
    }
    const showIds = showStrings.map(Number);
    allPodcasts = await getFilterPodcastsUserInfo({ show: showIds });
  } else if (searchParams.amount) {
    showAmount = parseInt(searchParams.amount);
    allPodcasts = await getPodcastsWithUserInfo(showAmount);
  }

  const allShows = await getAllShows();
  const shows = allShows.slice(0, 8);

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex min-h-screen w-screen justify-center p-5 lg:h-screen lg:py-[1.875rem]">
      <div className=" mt-16 flex max-w-[85rem] flex-col gap-5 lg:flex-row">
        <section className="flex w-full flex-col gap-5 lg:w-[13.125rem]">
          <div className="flex lg:hidden">
            <HostMeetup
              title="Host a Meetup"
              description="Find other Hipnoders in your area so you can learn, share and work together"
              buttonOne="Code of Conduct"
              buttonTwo="Host a Meetup"
            />
          </div>
          <div className="hidden lg:flex">
            <Categories shows={shows} />
          </div>
        </section>
        <section className="flex w-full flex-col">
          <PodcastPageFilter allPodcasts={allPodcasts} />
        </section>
        <section className="flex w-full lg:w-fit">
          <div className="hidden lg:flex">
            <HostMeetup
              title="Host a Meetup"
              description="Find other Hipnoders in your area so you can learn, share and work together"
              buttonOne="Code of Conduct"
              buttonTwo="Host a Meetup"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
