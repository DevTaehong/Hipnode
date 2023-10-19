import { MeetUp } from "@prisma/client";

import { Pills, MeetupDate } from ".";
import {
  RightSidebarWrapper,
  RightSidebarHeader,
  ImageWithCaption,
} from "../shared-components";

const Meetups = ({ meetUps }: { meetUps: MeetUp[] }) => {
  return (
    <RightSidebarWrapper>
      <RightSidebarHeader heading={"Meetups"} />
      {meetUps?.slice(0, 5).map((meet) => {
        return (
          <article
            className="flex flex-row bg-light  pb-[1.25rem] dark:bg-dark-3"
            key={meet.id}
          >
            <MeetupDate createdAt={meet.createdAt} />

            <div className="flex flex-col  justify-between pl-[0.875rem]">
              <div className="flex flex-col gap-0.5">
                <h3 className="semibold-14 capitalize text-sc-2 dark:text-light-2">
                  {meet.title.slice(0, 22)}
                </h3>
                <div className="flex gap-[0.375rem]">
                  <ImageWithCaption
                    imageSrc={meet.image}
                    imageTitle={meet.title}
                    imageAlt={meet.title}
                    caption={meet.location}
                    imageWidth={16}
                    imageHeight={16}
                    className="h-[1rem] w-[1rem] rounded-full"
                  />
                  <p className="base-10 text-sc-3">{meet.location}</p>
                </div>
              </div>
              <div className="flex">
                <Pills />
              </div>
            </div>
          </article>
        );
      })}
    </RightSidebarWrapper>
  );
};

export default Meetups;
