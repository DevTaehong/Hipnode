import { Podcast } from "@prisma/client";
import { RightSidebarWrapper, RightSidebarHeader, ImageWithCaption } from "..";
import { ArrowIcon } from "@/components/icons/outline-icons";

type PodcastWithUser = Podcast & {
  user: {
    username: string;
  };
};

const Podcasts = ({ podcasts }: { podcasts: PodcastWithUser[] }) => {
  const podcastArray = podcasts.slice(0, 6);

  return (
    <RightSidebarWrapper>
      <RightSidebarHeader heading={"Podcasts"} />
      {podcastArray?.slice(0, 5).map((podcast) => {
        return (
          <article
            className="flex w-full flex-row bg-light  pb-[1.25rem] dark:bg-dark-3"
            key={podcast.id}
          >
            <div className="flex w-full flex-row">
              <div className="flex w-full">
                <div className="flex pr-[0.875rem]">
                  <ImageWithCaption
                    imageSrc={podcast.image}
                    imageTitle={podcast.title}
                    imageAlt={podcast.title}
                    imageWidth={58}
                    imageHeight={58}
                    className="h-[3.625rem] w-[3.625rem] rounded-[0.25rem]"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h3 className="semibold-12 pb-[0.375rem] capitalize text-sc-2 dark:text-light-2">
                    {podcast.title}
                  </h3>
                  <p className="base-10 text-sc-3">
                    by {podcast.user.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <ArrowIcon.Right className="stroke-sc-3" />
              </div>
            </div>
          </article>
        );
      })}
    </RightSidebarWrapper>
  );
};

export default Podcasts;
