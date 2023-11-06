import Link from "next/link";

import { RightSidebarHeader } from "@/components/home-page/shared-components";
import { MeetupItem } from "@/components/home-page/meetup";
import { MeetupsProps } from "@/types/homepage";

const Meetups = ({ meetUps }: MeetupsProps) => (
  <div className="rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
    <Link href="/meet-ups">
      <RightSidebarHeader heading={"Meetups"} />
    </Link>
    {meetUps
      ?.slice(0, 4)
      .map((meet) => <MeetupItem meet={meet} key={meet.id} />)}
  </div>
);

export default Meetups;
