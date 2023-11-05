import {
  getTopFiveTags,
  getFilteredInterviews,
} from "@/lib/actions/interview.actions";
import FormLink from "@/components/FormLink";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { Categories } from "@/components/podcast-components";
import InterviewPageFilter from "@/components/interview-components/InterviewPageFilter";
import { interviewFormLinkProps } from "@/constants/interview";

interface SearchProps {
  interview: string[];
}

const Interviews = async ({ searchParams }: { searchParams: SearchProps }) => {
  const tags = await getTopFiveTags();

  let interviewArray;

  if (searchParams.interview) {
    const interviews = Array.isArray(searchParams.interview)
      ? searchParams.interview
      : [searchParams.interview];
    interviewArray = interviews.map(Number);
  }

  const podcasts = await getAllPodcastsWithUserInfo();
  const interviewsExample = await getFilteredInterviews({
    tagIds: interviewArray,
  });

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex min-h-screen w-screen justify-center p-5 lg:h-screen lg:pb-[2.3rem] lg:pt-[1.875rem]">
      <div className="mt-16 flex max-w-[85rem] flex-col gap-5 lg:flex-row xl:w-full">
        <section
          className="
      flex w-full flex-col gap-5 lg:w-[13.125rem]"
        >
          <Categories
            filters={tags}
            page="interviews"
            urlFilter="interview"
            className="lg:w-[13.125rem]"
          />
        </section>

        <InterviewPageFilter
          interviews={interviewsExample}
          interviewArray={interviewArray}
        />
        <section className="flex w-full lg:max-w-[20.3125rem]">
          <div className="flex w-full flex-col gap-5 overflow-scroll">
            <FormLink {...interviewFormLinkProps} />
            <Podcasts podcasts={podcasts} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Interviews;
