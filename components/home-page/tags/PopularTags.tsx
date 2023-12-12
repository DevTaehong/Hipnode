import { colorVariants } from "@/constants";
import { cn } from "@/lib/utils";
import { getIconConfig } from "@/utils";

type TagsProps = {
  tagsData: { name: string; views: number }[];
};

const PopularTags = ({ tagsData }: TagsProps) => {
  const combinedTags = tagsData.map((tag) => ({
    ...tag,
    ...getIconConfig(tag.name),
  }));

  return (
    <aside className="flex h-fit w-full flex-col items-start justify-center rounded-2xl bg-light p-5 dark:bg-dark-3 lg:w-[13.125rem]">
      <h1 className="semibold-16 mb-5 text-sc-2 dark:text-light-2">
        Popular Tags
      </h1>
      {combinedTags.map((tag) => {
        const Icon = tag.icon;
        return (
          <div
            key={tag.name}
            className="mb-[0.675rem] flex items-center justify-center gap-3"
          >
            <div
              className={`flex rounded-lg ${
                colorVariants[tag.iconBgColor]
              } p-[0.375rem]`}
            >
              <Icon className={`${colorVariants[tag.iconFillColor]}`} />
            </div>
            <div className="flex flex-col">
              <p className="semibold-12 text-sc-4 dark:text-light-2">
                #{tag.name}
              </p>
              <p className="regular-10 line-clamp-1 text-sc-4 dark:text-sc-3">
                {tag.views} • Trending
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default PopularTags;
