import Link from "next/link";
import Image from "next/image";

import { podcast } from "@/public/assets";
import AudioAnimation from "./AudioAnimation";
import { PodcastBarImageProps } from "@/types/podcast.index";
import usePodcastStore from "@/app/store";

const PodcastBarImage = ({ id, podcastUserImage }: PodcastBarImageProps) => {
  const { isPlaying } = usePodcastStore();
  return (
    <div className="relative flex gap-2">
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
      {isPlaying && (
        <div className="absolute -top-10 right-[2.3rem] sm:-right-2 sm:top-2">
          <AudioAnimation />
        </div>
      )}
    </div>
  );
};

export default PodcastBarImage;
