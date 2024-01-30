import Link from "next/link";

import { ImageWithCaption } from "../shared-components";
import OutlineIcon from "@/components/icons/outline-icons";
import { PodcastItemProps } from "@/types/homepage";

const PodcastItem = ({
  podcast: { image, title, user, id },
}: PodcastItemProps) => (
  <Link
    href={`/podcasts/${id}`}
    className="group flex w-full justify-between bg-light dark:bg-dark-3"
  >
    <div className="flex">
      <ImageWithCaption
        imageSrc={image}
        imageTitle={title}
        imageAlt={title}
        imageWidth={58}
        imageHeight={58}
        className="mr-[0.875rem] size-[3.625rem] rounded-[0.25rem] border border-solid border-podcastSidebar shadow-podcastSidebar"
      />
      <div className="flex flex-col justify-between overflow-hidden">
        <h3 className="semibold-12 whitespace-pre-wrap pb-[0.375rem] capitalize text-sc-2 transition-colors group-hover:text-blue dark:text-light-2">
          {title}
        </h3>
        <p className="base-10 text-sc-3">by {user.username}</p>
      </div>
    </div>
    <div className="flex items-center">
      <OutlineIcon.ArrowRight className="stroke-sc-3 transition group-hover:translate-x-[0.3rem]" />
    </div>
  </Link>
);

export default PodcastItem;
