"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryObject } from "@/types/podcast.index";

interface SeeAllPodcastsProps {
  urlString: QueryObject;
  podcastLength?: number;
}

const SeeAllPodcasts = ({ urlString, podcastLength }: SeeAllPodcastsProps) => {
  const router = useRouter();
  const [fetchNumber, setFetchNumber] = useState(20);

  let queryString: string;
  if (Object.keys(urlString).length) {
    const queryObj = urlString;

    const valuesArray = Array.isArray(queryObj.show)
      ? queryObj.show
      : [queryObj.show];
    queryString = valuesArray
      .filter((value): value is string => typeof value === "string")
      .map((value) => `show=${value}`)
      .join("&");
  }

  const handleButtonClick = () => {
    setFetchNumber((prev) => prev + 20);
    const number = fetchNumber + 20;

    let newURL;
    if (!queryString || queryString.startsWith("show=undefined")) {
      newURL = `/podcasts?amount=${number}`;
    } else {
      newURL = `/podcasts?${queryString}&amount=${number}`;
    }
    router.push(newURL);
  };

  useEffect(() => {
    if (!podcastLength || podcastLength < 20) {
      setFetchNumber(20);
    }
  }, [podcastLength]);

  return (
    <button
      className={`self-center ${
        !podcastLength || (podcastLength < 20 && "hidden")
      }`}
      onClick={handleButtonClick}
    >
      See More
    </button>
  );
};

export default SeeAllPodcasts;
