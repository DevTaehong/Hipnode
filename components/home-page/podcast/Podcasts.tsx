import Link from "next/link";

import { RightSidebarWrapper, RightSidebarHeader } from "../shared-components";
import PodcastItem from "./PodcastItem";
import { PodcastsProps } from "@/types/homepage";

const Podcasts = ({ podcasts }: PodcastsProps) => {
  const podcastArray = podcasts.slice(0, 6);
  return (
    <RightSidebarWrapper>
      <Link href="/podcasts">
        <RightSidebarHeader heading={"Podcasts"} />
      </Link>
      {podcastArray
        ?.slice(0, 5)
        .map((podcast) => <PodcastItem key={podcast.id} podcast={podcast} />)}
    </RightSidebarWrapper>
  );
};

export default Podcasts;
