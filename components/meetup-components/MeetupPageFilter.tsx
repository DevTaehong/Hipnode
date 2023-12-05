"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { extractArray } from "@/utils";
import { getFilteredMeetups } from "@/lib/actions/meetup.actions";
import BoxShading from "../interview-components/BoxShading";
import SeeMoreButton from "../interview-components/SeeMoreButton";
import MeetupsCard from "./MeetupsCard";
import { MeetUpExtended, MeetupsPageProps } from "@/types/meetups.index";
import LoaderComponent from "../onboarding-components/LoaderComponent";

const MeetupPageFilter = ({
  loading,
  setIsLoading,
  meetupsData,
  meetupFilters,
}: MeetupsPageProps) => {
  const queryString = useSearchParams().toString();
  const meetupIds =
    queryString === "" ? meetupFilters : extractArray(queryString, "meetups");

  const [meetupsList, setMeetupsList] = useState<MeetUpExtended[]>(
    meetupsData.meetups
  );
  const [currentPage, setCurrentPage] = useState(meetupsData.page);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreMeetups, setHasMoreMeetups] = useState(meetupsData.hasMore);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchMoreMeetups = async () => {
      if (inView || loadMore) {
        try {
          const moreMeetups = await getFilteredMeetups({
            tagIds: meetupIds,
            page: currentPage,
          });

          if (moreMeetups.meetups.length) {
            setMeetupsList((prevMeetups) => [
              ...(prevMeetups ?? []),
              ...moreMeetups.meetups,
            ]);
            setCurrentPage((prevPage) => prevPage + 1);
          }
          setHasMoreMeetups(moreMeetups.hasMore);
          setLoadMore(false);
        } catch (error) {
          console.error("Error fetching more meetups:", error);
          setLoadMore(false);
        }
      }
    };
    fetchMoreMeetups();
  }, [inView, loadMore]);

  useEffect(() => {
    setMeetupsList(meetupsData.meetups);
    setIsLoading(false);
  }, [meetupsData]);

  if (loading) {
    return (
      <div className="flex-center flex w-full">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <article className="relative flex xl:w-full">
      <BoxShading />
      <section className="flex w-fit flex-col gap-5 overflow-y-scroll xl:w-full">
        {meetupsList.length === 0 && <p>No meetups available.</p>}
        {meetupsList.length &&
          meetupsList.map((meetup) => (
            <MeetupsCard key={meetup.id} meetUp={meetup} />
          ))}
        <SeeMoreButton array={meetupsList} setLoadMore={setLoadMore} />
        <p
          ref={ref}
          className={`${
            !hasMoreMeetups && "hidden lg:hidden"
          } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
        >
          Loading...
        </p>
      </section>
    </article>
  );
};

export default MeetupPageFilter;
