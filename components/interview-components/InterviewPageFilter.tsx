"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { InterviewCard } from ".";
import { extractArray } from "@/utils";
import { getFilteredInterviews } from "@/lib/actions/interview.actions";
import SeeMoreButton from "./SeeMoreButton";
import BoxShading from "./BoxShading";
import OnboardingLoader from "../onboarding-components/OnboardingLoader";
import { InterviewPageProps } from "@/types/interview.index";

const InterviewPageFilter = ({
  loading,
  setLoading,
  interviews,
  interviewArray,
}: InterviewPageProps) => {
  const queryString = useSearchParams().toString();
  const interviewIds =
    queryString === ""
      ? interviewArray
      : extractArray(queryString, "interview");

  const [interviewList, setInterviewList] = useState(interviews);
  const [interviewAmount, setInterviewAmount] = useState(20);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreInterviews, setHasMoreInterviews] = useState(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchMoreInterviews = async () => {
      if (inView || loadMore) {
        const moreInterviews = await getFilteredInterviews({
          tagIds: interviewIds,
          skipCount: interviewAmount,
        });
        if (moreInterviews.length === 0) {
          setHasMoreInterviews(false);
        } else {
          setInterviewList((prevInterviews) => [
            ...(prevInterviews ?? []),
            ...moreInterviews,
          ]);
          setInterviewAmount((prevValue) => prevValue + 20);
          if (loadMore) {
            setLoadMore(false);
          }
          if ((interviewList ?? []).length + moreInterviews.length < 20) {
            setHasMoreInterviews(false);
          }
        }
      }
    };
    fetchMoreInterviews();
  }, [inView, loadMore]);

  useEffect(() => {
    setInterviewList(interviews);
    setInterviewAmount(20);
    setHasMoreInterviews(true);
    setLoading(false);
  }, [interviews, queryString]);

  if (loading) {
    return (
      <div className="flex-center flex w-full">
        <OnboardingLoader />
      </div>
    );
  }

  return (
    <article className="relative flex xl:w-full">
      <BoxShading />
      <section className="flex w-fit flex-col gap-5 overflow-y-scroll xl:w-full">
        {interviewList.map((interview) => (
          <InterviewCard key={interview.id} interviewData={interview} />
        ))}
        <SeeMoreButton array={interviewList} setLoadMore={setLoadMore} />
        <p
          ref={ref}
          className={`${
            !hasMoreInterviews && "hidden lg:hidden"
          } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
        >
          Loading...
        </p>
      </section>
    </article>
  );
};

export default InterviewPageFilter;
