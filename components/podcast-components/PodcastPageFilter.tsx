"use client";

import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getFilterPodcastsUserInfo } from "@/lib/actions/podcast.actions";
import { extractArray } from "@/utils";
import { PodcastPageFilterProps } from "@/types/podcast.index";
import PodcastListColumn from "./PodcastListColumn";
import SeeMoreButton from "../interview-components/SeeMoreButton";
import BoxShading from "../interview-components/BoxShading";

const PodcastPageFilter = ({
  listedPodcasts,
  userShowsIds,
}: PodcastPageFilterProps) => {
  const queryString = useSearchParams().toString();
  const showsArray =
    queryString === "" ? userShowsIds : extractArray(queryString, "show");
  const [podcasts, setPodcasts] = useState(listedPodcasts);
  const [podcastAmount, setPodcastAmount] = useState(20);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [ref, inView] = useInView();

  const oddPodcasts = podcasts?.filter((_, index) => index % 2 !== 0);
  const evenPodcasts = podcasts?.filter((_, index) => index % 2 === 0);

  const displayedPodcasts = [
    {
      listNumber: "List One",
      list: evenPodcasts,
    },
    {
      listNumber: "List Two",
      list: oddPodcasts,
    },
  ];

  useEffect(() => {
    const fetchMorePodcasts = async () => {
      if (inView || loadMore) {
        const morePodcasts = await getFilterPodcastsUserInfo({
          show: showsArray,
          skipCount: podcastAmount,
        });
        if (morePodcasts.length === 0) {
          setHasMoreItems(false);
        } else {
          setPodcasts((prevPodcasts) => [
            ...(prevPodcasts || []),
            ...morePodcasts,
          ]);
          setPodcastAmount((prevValue) => prevValue + 20);
          if (loadMore) {
            setLoadMore(false);
          }
          if ((podcasts ?? []).length + morePodcasts.length < 20) {
            setHasMoreItems(false);
          }
        }
      }
    };
    fetchMorePodcasts();
  }, [inView, loadMore]);

  useEffect(() => {
    setPodcasts(listedPodcasts);
    setPodcastAmount(20);
    setHasMoreItems(true);
  }, [listedPodcasts, queryString]);

  return (
    <article className="relative flex h-full w-full flex-col">
      <BoxShading />
      <section className="no-scrollbar flex w-full flex-col lg:h-screen lg:overflow-scroll lg:pb-10">
        <div className="flex flex-col gap-5 xl:flex-row">
          {displayedPodcasts.map((podcasts) => (
            <PodcastListColumn key={podcasts.listNumber} podcasts={podcasts} />
          ))}
        </div>
        <SeeMoreButton
          array={podcasts}
          setLoadMore={setLoadMore}
          className="mt-5"
        />
        <p
          ref={ref}
          className={`${
            !hasMoreItems && "hidden lg:hidden"
          } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
        >
          Loading...
        </p>
      </section>
    </article>
  );
};

export default PodcastPageFilter;
