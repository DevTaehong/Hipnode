import { exploreIcons } from "@/constants";

const Explore = () => {
  return (
    <div className="flex flex-row items-center justify-between rounded-2xl bg-light p-[0.625rem] dark:bg-dark-3">
      <div className="semibold-16 text-sc-2 dark:text-light-2">Explore</div>
      <div className="semibold-12 flex flex-row items-center gap-[0.88rem]">
        {exploreIcons.map((icon) => (
          <div
            key={icon.label}
            className={`flex flex-row items-center justify-center gap-[0.62rem] rounded-[0.25rem] ${icon.bgColor} p-[0.375rem] ${icon.textColor}`}
          >
            {icon.icon}
            {icon.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
