import Link from "next/link";

import { ImageWithCaption } from "../shared-components";
import OutlineIcon from "@/components/icons/outline-icons";
import { PodcastItemProps } from "@/types/homepage";

const PodcastItem = ({
  podcast: { image, title, user, id },
}: PodcastItemProps) => (
  <article className="flex w-full flex-row bg-light pt-[1.25rem] dark:bg-dark-3">
    <div className="flex w-full flex-row">
      <div className="flex w-full">
        <ImageWithCaption
          imageSrc={image}
          imageTitle={title}
          imageAlt={title}
          imageWidth={58}
          imageHeight={58}
          className="h-[3.625rem] w-[3.625rem] rounded-[0.25rem] mr-[0.875rem]"
        />
        <div className="flex flex-col justify-between overflow-hidden">
          <h3 className="semibold-12 truncate pb-[0.375rem] capitalize text-sc-2 dark:text-light-2">
            {title}
          </h3>
          <p className="base-10 text-sc-3">by {user.username}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Link href={`/podcasts/${id}`}>
          <OutlineIcon.ArrowRight className="stroke-sc-3" />
        </Link>
      </div>
    </div>
  </article>
);

export default PodcastItem;
