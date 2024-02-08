import Image from "next/image";
import Link from "next/link";

type TagsProps = {
  tagsData: { name: string; views: number }[];
  pathName: string;
};

const PopularTags = ({ tagsData, pathName }: TagsProps) => {
  return (
    <aside className="flex h-fit w-full flex-col items-start justify-center gap-y-2.5 rounded-2xl bg-light px-2.5 pb-[0.625rem] pt-4 dark:bg-dark-3 lg:w-[13.125rem]">
      <h1 className="semibold-16 pl-[0.3125rem] text-sc-2 dark:text-light-2">
        Popular Tags
      </h1>
      <div className="flex w-full flex-col items-start">
        {tagsData.map((tag) => {
          return (
            <Link
              href={`${pathName}?tag=${tag.name}`}
              key={tag.name}
              className="flex size-full cursor-pointer items-center justify-start gap-2.5 px-[0.3125rem] py-1.5 transition-colors 
                hover:rounded-md hover:bg-light-2 dark:hover:bg-dark-4"
            >
              <div className="flex-center size-8 shrink-0 rounded-lg bg-red-10">
                <Image
                  src="/svg/hashTag.svg"
                  alt={tag.name}
                  className="size-5"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex flex-col">
                <p className="semibold-12 text-sc-4 dark:text-light-2">
                  #{tag.name}
                </p>
                <p className="regular-10 line-clamp-1 text-sc-4 dark:text-sc-3">
                  {tag.views} Posted By this tag
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default PopularTags;
