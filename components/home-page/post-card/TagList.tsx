import Link from "next/link";

import { TagListProps } from "@/types/posts";

const TagList = ({
  tags,
  userIdFromParams,
  setTagged,
  username,
}: TagListProps) => {
  return (
    <ul className="flex justify-start gap-[0.625rem]">
      {tags.slice(0, 3).map((item) => {
        const urlPath = userIdFromParams
          ? `${username}?tag=${item}`
          : `?tag=${item}`;
        return (
          <Link href={urlPath} key={item}>
            <li
              onClick={() => setTagged(item)}
              className="semibold-10 w-fit cursor-pointer rounded-full bg-light-3 px-[0.625rem] py-1 leading-[0.875rem] text-sc-4 transition-opacity hover:opacity-80 dark:bg-dark-4 dark:text-sc-5"
            >
              {item}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default TagList;
