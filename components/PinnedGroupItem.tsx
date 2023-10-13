import Image from "next/image";

import { christopher } from "@/public/assets";

interface PinnedGroupItemProps {
  group: {
    id: number;
    createdAt: string;
    details: string;
    groupName: string;
    updatedAt: string;
  };
}
const PinnedGroupItem = ({ group }: PinnedGroupItemProps) => {
  return (
    <li className="flex items-center gap-2.5">
      <Image
        src={christopher}
        alt={`Logo of group ${group.groupName} in list of pinned groups`}
        height={32}
        width={32}
        className="rounded"
      />

      <article className="flex flex-col">
        <h3 className="semibold-12 text-sc-4_light-2">{group.groupName}</h3>
        <p className="base-9 text-sc-4 dark:text-sc-3">{group.details}</p>
      </article>
    </li>
  );
};

export default PinnedGroupItem;
