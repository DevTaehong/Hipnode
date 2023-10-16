import { socialStats } from "@/constants";

const SocialStatistics = () => (
  <aside>
    <ul className="flex flex-row justify-start pt-[1.25rem] text-[0.563rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:pt-0">
      {Object.entries(socialStats).map(([key, value], index) => (
        <li className="flex flex-row pr-[1.875rem]" key={index}>
          <p className="pr-2">{value}</p>
          <p className="capitalize">{key}</p>
        </li>
      ))}
    </ul>
  </aside>
);

export default SocialStatistics;
