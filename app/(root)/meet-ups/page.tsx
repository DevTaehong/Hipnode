import {
  getTopFiveMeetupTags,
  getFilteredMeetups,
} from "@/lib/actions/meetup.actions";
import FormLink from "@/components/FormLink";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { meetupFormLinkProps } from "@/constants";
import MeetupFilterAndContentWrapper from "@/components/meetup-components/MeetupFilterAndContentWrapper";

interface SearchProps {
  meetup: string[];
}

const Meetups = async ({ searchParams }: { searchParams: SearchProps }) => {
  const meetupTags = await getTopFiveMeetupTags();

  const meetupFilters = searchParams.meetup
    ? (Array.isArray(searchParams.meetup)
        ? searchParams.meetup
        : [searchParams.meetup]
      ).map(Number)
    : [];

  const podcasts = await getAllPodcastsWithUserInfo();
  const meetupData = await getFilteredMeetups({
    tagIds: meetupFilters,
  });
  return (
    <main className="bg-light-2_dark-2 mt-[-5rem] flex min-h-screen w-screen justify-center p-5 pb-[5.5rem] lg:h-screen lg:pt-[1.875rem]">
      <div className="mt-20 flex max-w-[85rem] flex-col gap-5 lg:sticky lg:mt-16 lg:flex-row lg:overflow-hidden xl:w-full">
        <MeetupFilterAndContentWrapper
          meetupTags={meetupTags}
          meetupData={meetupData}
          meetupFilters={meetupFilters}
        />
        <section className="flex w-full lg:max-w-[20.3125rem]">
          <div className="flex w-full flex-col gap-5 overflow-scroll">
            <FormLink {...meetupFormLinkProps} className="hidden lg:flex" />
            <Podcasts podcasts={podcasts} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Meetups;
