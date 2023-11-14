import { exploreIcons } from "@/constants";

const Explore = () => {
  const colorVariants: { [key: string]: string } = {
    newIcon: "fill-sc-2 dark:fill-light-2",
    newIconSecondary: "fill-light-2 dark:fill-dark-3",
    popularIcon: "fill-red-80",

    newIconBg: "bg-light-2 dark:bg-dark-4",
    newIconText: "text-sc-2 dark:text-light-2",

    popularBg: "bg-red-10",
    popularText: "text-red-80",
  };

  return (
    <div className="flex flex-row items-center justify-between rounded-2xl bg-light p-[0.625rem] dark:bg-dark-3 lg:px-5 lg:py-4">
      <div className="semibold-16 text-sc-2 dark:text-light-2">Explore</div>
      <div className="semibold-12 flex flex-row items-center gap-[0.88rem]">
        {exploreIcons.map((icon) => (
          <div
            key={icon.label}
            className={`flex h-8 flex-row items-center justify-center gap-[0.62rem] rounded-[0.25rem] p-[0.375rem] 
              ${colorVariants[icon.bgColor]} ${colorVariants[icon.textColor]} 
            `}
          >
            {
              <icon.Icon
                className={colorVariants[icon.color]}
                color={colorVariants[icon.color]}
                secondaryColor={colorVariants[icon.secondaryColor as string]}
              />
            }
            {icon.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
