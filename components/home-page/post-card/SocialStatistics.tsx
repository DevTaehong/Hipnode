import { SocialStatisticsProps } from "@/types/homepage";

const SocialStatistics = ({ socialCounts }: SocialStatisticsProps) => {
  return (
    <aside>
      <ul className="flex flex-row flex-wrap justify-start pt-[1.25rem] text-[0.563rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:pt-0 lg:ml-4">
        {socialCounts?.map(([key, value]) => {
          return (
            <li className="flex flex-row justify-start" key={key}>
              <p className="pr-1 ">{value}</p>
              <p className="pr-[1.875] capitalize lg:pr-[2.5rem]">{key}</p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SocialStatistics;
