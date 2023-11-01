import { currentUser } from "@clerk/nextjs";

import { getFilterPodcastsUserInfo } from "@/lib/actions/podcast.actions";
import { getAllUsersShows } from "@/lib/actions/show.actions";
import FormLink from "@/components/FormLink";
import { podcastFormLinkProps } from "@/constants";
import { redirect } from "next/navigation";
import { Categories, PodcastPageFilter } from "@/components/podcast-components";
interface SearchProps {
  show: string | string[];
  amount: string;
}

const Podcasts = async ({ searchParams }: { searchParams: SearchProps }) => {
  const user = await currentUser();

  if (!user) {
    console.error("Can't find user");
    redirect("/");
  }

  const usersShows = await getAllUsersShows(user.id);

  if (!usersShows) {
    redirect("/");
  }
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
    <main className="bg-light-2_dark-2 -mt-16 flex min-h-screen w-screen justify-center p-5 lg:h-screen lg:pb-[2.3rem] lg:pt-[1.875rem]">
      <div className=" mt-16 flex max-w-[85rem] flex-col gap-5 lg:flex-row">
        <section className="flex w-full flex-col gap-5 lg:w-[13.125rem]">
          <FormLink {...podcastFormLinkProps} className="flex lg:hidden" />
          <div className="hidden overflow-scroll lg:flex">
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
          <FormLink {...podcastFormLinkProps} className="hidden lg:flex" />
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
