import Link from "next/link";

import {
  RightSidebarWrapper,
  RightSidebarHeader,
} from "@/components/home-page/shared-components";
import { MeetupItem } from "@/components/home-page/meetup";
import { MeetupsProps } from "@/types/homepage";

const Meetups = ({ meetUps }: MeetupsProps) => (
  <RightSidebarWrapper>
    <Link href="/meet-ups">
      <RightSidebarHeader heading={"Meetups"} />
    </Link>
    {meetUps
      ?.slice(0, 5)
      .map((meet) => <MeetupItem meet={meet} key={meet.id} />)}
  </RightSidebarWrapper>
);

export default Meetups;
