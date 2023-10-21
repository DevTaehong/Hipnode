import { currentUser } from "@clerk/nextjs";

import { getFilterPodcastsUserInfo } from "@/lib/actions/podcast.actions";
import { getAllUsersShows } from "@/lib/actions/show.actions";
import FormLink from "@/components/FormLink";
import PodcastPageFilter from "@/components/podcast-components/PodcastPageFilter";
import Categories from "@/components/podcast-components/Categories";
import { podcastFormLinkProps } from "@/constants";
interface PodcastsProps {
  show: string | string[];
  amount: string;
}

const Podcasts = async ({ searchParams }: { searchParams: PodcastsProps }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Can't find user");
  }

  const usersShows = await getAllUsersShows(user.id);
  const usersShowsIds = usersShows.map((show) => show.id);

  let listedPodcasts;
  let showStrings;

  if (!searchParams || Object.keys(searchParams).length === 0) {
    listedPodcasts = await getFilterPodcastsUserInfo({
      show: usersShowsIds,
    });
  } else if (searchParams.show) {
    showStrings = searchParams.show;
    if (!Array.isArray(showStrings)) {
      showStrings = [showStrings];
    }
    const filteredShowIds = showStrings.map(Number);
    listedPodcasts = await getFilterPodcastsUserInfo({
      show: filteredShowIds,
    });
  }

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex min-h-screen w-screen justify-center p-5 lg:h-screen lg:py-[1.875rem]">
      <div className=" mt-16 flex max-w-[85rem] flex-col gap-5 lg:flex-row">
        <section className="flex w-full flex-col gap-5 lg:w-[13.125rem]">
          <div className="flex lg:hidden">
            <FormLink {...podcastFormLinkProps} />
          </div>
          <div className="hidden lg:flex">
            <Categories shows={usersShows} />
          </div>
        </section>
        <section className="flex w-full flex-col">
          <PodcastPageFilter
            listedPodcasts={listedPodcasts}
            userShowsIds={usersShowsIds}
          />
        </section>
        <section className="flex w-full lg:w-fit">
          <div className="hidden lg:flex">
            <FormLink {...podcastFormLinkProps} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
