import Link from "next/link";
import Image from "next/image";

import { christopher } from "@/public/assets";

interface PodcastBarImageProps {
  id: number | undefined;
  podcastUserImage: string;
}

const PodcastBarImage = ({ id, podcastUserImage }: PodcastBarImageProps) => {
  return (
    <Link href={`/podcasts/${id}`} className="min-h-[50px] min-w-[50px] ">
      <Image
        src={podcastUserImage || christopher}
        height={50}
        width={50}
        alt="christopher"
        className="rounded-full"
      />
    </Link>
  );
};

export default PodcastBarImage;
