import Link from "next/link";

import { RightSidebarWrapper, RightSidebarHeader } from "../shared-components";
import PodcastItem from "./PodcastItem";
import { PodcastsProps } from "@/types/homepage";

const Podcasts = ({ podcasts }: PodcastsProps) => {
  const podcastArray = podcasts.slice(0, 4);
  return (
    <RightSidebarWrapper>
      <>
        <Link href="/podcasts">
          <RightSidebarHeader heading={"Podcasts"} />
        </Link>
        {podcastArray.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </>
    </RightSidebarWrapper>
  );
};

export default Podcasts;
