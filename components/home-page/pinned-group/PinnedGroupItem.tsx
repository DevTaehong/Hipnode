import Link from "next/link";

import { PinnedGroupItemProps } from "@/types/homepage";
import GroupImage from "./GroupImage";

const PinnedGroupItem = ({ group }: PinnedGroupItemProps) => {
  const { name, description, coverImage, id } = group;
  return (
    <Link href={`/group/${id}`}>
      <li
        className="flex cursor-pointer items-center gap-2.5 px-[0.3125rem] py-1.5 transition-colors hover:rounded-md 
          hover:bg-light-2 dark:hover:bg-dark-4"
      >
        {coverImage && <GroupImage src={coverImage} name={name} />}

        <article className="flex flex-col">
          <h3 className="semibold-12 text-sc-4_light-2">{name}</h3>
          <p className="base-9 line-clamp-1 text-sc-4 dark:text-sc-3">
            {description}
          </p>
        </article>
      </li>
    </Link>
  );
};

export default PinnedGroupItem;
