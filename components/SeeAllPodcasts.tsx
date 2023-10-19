"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SeeAllPodcasts = ({ podcastLength }: { podcastLength?: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fetchNumber, setFetchNumber] = useState(20);

  let queryString: string;
  if (searchParams.size > 0) {
    queryString = searchParams.toString();
  }

  const handleButtonClick = () => {
    setFetchNumber((prev) => prev + 20);
    const number = fetchNumber + 20;

    let newURL;
    if (!queryString || queryString.startsWith("amount")) {
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
