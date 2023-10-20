"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Podcast } from "@prisma/client";

import { christopher } from "@/public/assets";
import PodcastCard from "./PodcastCard";
import { getPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { ArrowIcon } from "../icons/outline-icons";

interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

interface PodcastPageFilterProps {
  allPodcasts: PodcastUserInfo[] | undefined;
}

const PodcastPageFilter = ({ allPodcasts }: PodcastPageFilterProps) => {
  const [podcasts, setPodcasts] = useState(allPodcasts);
  const [podcastAmount, setPodcastAmount] = useState(20);
  const [loadMore, setLoadMore] = useState(false);
  const [ref, inView] = useInView();

  const oddPodcasts = podcasts?.filter((_, index) => index % 2 !== 0);
  const evenPodcasts = podcasts?.filter((_, index) => index % 2 === 0);

  const displayedPodcasts = [
    {
      listNumber: "List One",
      list: oddPodcasts,
    },
    {
      listNumber: "List Two",
      list: evenPodcasts,
    },
  ];

  useEffect(() => {
    const fetchMorePodcasts = async () => {
      if (inView || loadMore) {
        const morePodcasts = await getPodcastsWithUserInfo(20, podcastAmount);
        setPodcasts((prevPodcasts) => [
          ...(prevPodcasts || []),
          ...morePodcasts,
        ]);
        setPodcastAmount((prevValue) => prevValue + 20);

        if (loadMore) {
          setLoadMore(false);
        }
      }
    };
    fetchMorePodcasts();
  }, [inView, loadMore]);

  useEffect(() => {
    setPodcasts(allPodcasts);
  }, [allPodcasts]);

  return (
    <article className="relative flex h-full w-full flex-col">
      <div className="absolute h-6 w-full bg-gradient-to-t from-transparent to-light-2 dark:to-dark-2" />
      <div className="absolute bottom-0 h-6 w-full bg-gradient-to-t from-light-2 to-transparent dark:from-dark-2" />
      <section className="no-scrollbar flex w-full flex-col pb-10 md:h-screen md:overflow-scroll">
        <div className="flex flex-col gap-5 xl:flex-row">
          {displayedPodcasts.map((podcasts) => (
            <div
              className="flex h-fit flex-col gap-5 xl:w-full"
              key={podcasts.listNumber}
            >
              {podcasts.list &&
                podcasts.list.map((podcast) => (
                  <PodcastCard key={podcast.id} info={podcast} />
                ))}
            </div>
          ))}
        </div>

        <button
          className={`mt-3 flex w-fit items-center gap-2.5 lg:hidden ${
            podcasts && podcasts.length < 20 && "hidden lg:hidden"
          }`}
          onClick={() => setLoadMore(true)}
        >
          <p className="text-sc-3">See More</p>
          <ArrowIcon.Right className="stroke-sc-3" />
        </button>

        <div
          ref={ref}
          className={`${
            podcasts && podcasts.length < 20 && "hidden lg:hidden"
          } mt-10 hidden self-center lg:flex`}
        >
          <Image
            src={christopher}
            height={80}
            width={80}
            alt="christopher"
            className="animate-bounce rounded-full"
          />
        </div>
      </section>
    </article>
  );
};

export default PodcastPageFilter;
