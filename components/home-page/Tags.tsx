import { tags, colorVariants } from "@/constants";

const Tags = () => {
  return (
    <aside className="p-[1.25rem] pt-0">
      <div className="flex h-fit flex-col items-start justify-center rounded-2xl bg-light p-5 dark:bg-dark-3">
        <h1 className="semibold-16 mb-5 text-sc-2 dark:text-light-2">
          Popular Tags
        </h1>
        {tags.map((tag) => {
          const IconComponent = tag.icon;
          return (
            <div
              className="mb-[0.675rem] flex items-center justify-center gap-3"
              key={tag.name}
            >
              <div
                className={`flex rounded-lg ${
                  colorVariants[tag.iconBgColor]
                } p-[0.375rem]`}
              >
                <IconComponent
                  className={`${colorVariants[tag.iconFillColor]}`}
                />
              </div>
              <div className="flex flex-col">
                <p className="semibold-12 text-sc-4 dark:text-light-2">
                  #{tag.name}
                </p>
                <p className="regular-10 line-clamp-1 text-sc-4 dark:text-sc-3">
                  {tag.views}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Tags;
