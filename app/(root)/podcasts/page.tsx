import { currentUser } from "@clerk/nextjs";

import {
  getFilterPodcastsUserInfo,
  getTopFiveShowIds,
} from "@/lib/actions/podcast.actions";
import { getAllUsersShows, getTopFiveShows } from "@/lib/actions/show.actions";
import FormLink from "@/components/FormLink";
import { podcastFormLinkProps } from "@/constants";
import { redirect } from "next/navigation";
import { Categories, PodcastPageFilter } from "@/components/podcast-components";
interface SearchProps {
  show: string | string[];
  amount: string;
}

const Podcasts = async ({ searchParams }: { searchParams: SearchProps }) => {
  const topFiveShows = await getTopFiveShowIds();
  const user = await currentUser();

  if (!user) {
    console.error("Can't find user");
    redirect("/");
  }

  let listOfShows = await getAllUsersShows(user.id);
  if (!listOfShows.length) {
    listOfShows = await getTopFiveShows(topFiveShows);
  }

  if (!listOfShows) {
    redirect("/");
  }
  const usersShowsIds = listOfShows.length
    ? listOfShows.map((show) => show.id)
    : topFiveShows;
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
    <main className="bg-light-2_dark-2 -mt-16 flex min-h-screen w-screen justify-center p-5 lg:h-screen lg:pb-[2.3rem] lg:pt-[1.875rem]">
      <div className=" mt-16 flex max-w-[85rem] flex-col gap-5 lg:flex-row">
        <section className="flex w-full flex-col gap-5 lg:w-[13.125rem]">
          <FormLink {...podcastFormLinkProps} className="flex lg:hidden" />
          <div className="hidden overflow-scroll lg:flex">
            <Categories
              filters={listOfShows}
              page="podcasts"
              urlFilter="show"
              className="md:w-[13.125rem]"
            />
          </div>
        </section>
        <section className="flex w-full flex-col">
          <PodcastPageFilter
            listedPodcasts={listedPodcasts}
            userShowsIds={usersShowsIds}
          />
        </section>
        <section className="flex w-full lg:w-fit">
          <FormLink {...podcastFormLinkProps} className="hidden lg:flex" />
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
