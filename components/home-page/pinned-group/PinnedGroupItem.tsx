import Image from "next/image";

import { christopher } from "@/public/assets";
import { PinnedGroupItemProps } from "@/types/homepage";

const PinnedGroupItem = ({
  group: { name, description },
}: PinnedGroupItemProps) => (
  <li className="flex items-center gap-2.5">
    <Image
      src={christopher}
      alt={`Logo of group ${name} in list of pinned groups`}
      height={32}
      width={32}
      className="rounded"
    />

    <article className="flex flex-col">
      <h3 className="semibold-12 text-sc-4_light-2">{name}</h3>
      <p className="base-9 text-sc-4 dark:text-sc-3">{description}</p>
    </article>
  </li>
);

export default PinnedGroupItem;
