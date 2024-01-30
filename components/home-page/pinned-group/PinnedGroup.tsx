import Link from "next/link";

import { Group } from "@prisma/client";
import OutlineIcons from "@/components/icons/outline-icons";
import PinnedGroupItem from "./PinnedGroupItem";

const PinnedGroup = ({ groups }: { groups: Group[] }) => (
  <section className="bg-light_dark-3 flex min-w-[13rem] flex-col gap-y-2.5 rounded-2xl px-2.5 pb-[0.625rem] pt-4">
    <Link href="/group" className="group flex items-center gap-1">
      <h1 className="text-sc-2_light-2 semibold-16 pl-[0.3125rem]">
        Pinned Group
      </h1>
      <OutlineIcons.ArrowRight className="stroke-sc-2 transition group-hover:translate-x-[0.3rem] dark:stroke-light-2" />
    </Link>

    <ul className="flex flex-col">
      {groups?.map((group) => <PinnedGroupItem key={group.id} group={group} />)}
    </ul>
  </section>
);
export default PinnedGroup;
