import Link from "next/link";
import Image from "next/image";

import { podcast } from "@/public/assets";

import { PodcastBarImageProps } from "@/types/podcast.index";

const PodcastBarImage = ({ id, podcastUserImage }: PodcastBarImageProps) => {
  return (
    <Link
      href={`/podcasts/${id}`}
      className="min-h-[50px] min-w-[50px] rounded-full bg-red-60"
    >
      <Image
        src={podcastUserImage || podcast}
        height={50}
        width={50}
        alt="picture of the podcast host"
        className="rounded-full"
      />
    </Link>
  );
};

export default PodcastBarImage;
