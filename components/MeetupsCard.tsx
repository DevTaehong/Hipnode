import Image from "next/image";

import { MeetUp } from "@prisma/client";
import { getFormattedDateMeetUpCard } from "@/utils";
import { meetUpsCardPills } from "@/constants";

const MeetupsCard = ({ meetUp }: { meetUp: MeetUp }) => {
  const { day, monthText } = getFormattedDateMeetUpCard(meetUp.createdAt);
  return (
    <article className="bg-light_dark-3 flex flex-col gap-4 rounded-2xl p-3.5 md:gap-6 md:p-5">
      <div className="flex justify-between">
        <figure className="flex items-center gap-5">
          <Image
            src={meetUp.image}
            alt={`A logo of the organization hosting the meetup ${meetUp.title}`}
            width={48}
            height={48}
            className="rounded-md md:h-[4.5rem] md:w-[4.5rem]"
          />
          <figcaption className="semibold-14 flex flex-col gap-1 md:gap-2">
            <h3 className="text-sc-2_light-2 semibold-14 md:semibold-18">
              {meetUp.title}
            </h3>
            <p className="base-10 md:base-14 text-sc-3">{meetUp.location}</p>
          </figcaption>
        </figure>

        <div className="bg-light_dark-4 flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center rounded-md md:h-[4.5rem] md:w-[3.6875rem]">
          <time className="semibold-12 md:semibold-16 text-sc-2_light-2">
            {monthText}
          </time>
          <p className="semibold-16 md:bold-26 text-blue">{day}</p>
        </div>
      </div>
      <p className="text-sc-1_light-2 flex">{meetUp.summary}</p>
      <ul className="flex gap-2.5">
        {meetUpsCardPills.map((pill: string) => (
          <li
            key={pill}
            className="bg-light-3_dark-4 semibold-10 md:semibold-12 rounded-full px-2 py-[0.125rem] text-sc-4"
          >
            {pill}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MeetupsCard;
