import { MeetUp } from "@prisma/client";

import { MeetupCardPills, MeetupImage, MeetUpDate } from ".";
import { RightSidebarWrapper, RightSidebarHeader } from "..";

const Meetups = ({ meetUp }: { meetUp: MeetUp[] }) => {
  return (
    <RightSidebarWrapper>
      <RightSidebarHeader heading={"Meetups"} />
      {meetUp?.slice(0, 5).map((meet) => {
        return (
          <article
            className="flex w-fit flex-row bg-light  pb-[1.25rem] dark:bg-dark-3"
            key={meet.id}
          >
            <MeetUpDate createdAt={meet.createdAt} />

            <div className="flex flex-col justify-start pl-[0.875rem]">
              <h3 className="semibold-14 md:semibold-18 capitalize text-sc-2 dark:text-light-2">
                {meet.title}
              </h3>
              <div className="flex">
                <MeetupImage
                  imageSrc={meet.image}
                  meetTitle={meet.title}
                  meetLocation={meet.location}
                />
              </div>
              <div className="pt-[0.625rem]">
                <MeetupCardPills />
              </div>
            </div>
          </article>
        );
      })}
    </RightSidebarWrapper>
  );
};

export default Meetups;
