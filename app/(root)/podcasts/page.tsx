import {
  getPodcastsWithUserInfo,
  getFilterPodcastsUserInfo,
} from "@/lib/actions/podcast.actions";
import { getAllShows } from "@/lib/actions/show.actions";
import HostMeetup from "@/components/HostMeetup";
import PodcastPageFilter from "@/components/PodcastPageFilter";

interface SearchParams {
  show: string | string[];
}

const Podcasts = async ({ searchParams }: { searchParams?: SearchParams }) => {
  let allPodcasts;

  if (!searchParams || Object.keys(searchParams).length === 0) {
    allPodcasts = await getPodcastsWithUserInfo();
  } else {
    let showStrings = searchParams.show;
    if (!Array.isArray(showStrings)) {
      showStrings = [showStrings];
    }
    const showIds = showStrings.map(Number);
    allPodcasts = await getFilterPodcastsUserInfo({ show: showIds });
  }

  const allShows = await getAllShows();

  return (
    <main className="bg-light-2_dark-2 flex min-h-screen w-screen justify-center p-5 md:py-[1.875rem]">
      <div className=" flex max-w-[85rem] flex-col gap-5 md:flex-row">
        <PodcastPageFilter allPodcasts={allPodcasts} allShows={allShows} />
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
