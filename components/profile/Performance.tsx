import PerformanceCard from "./PerformanceCard";

import { PerformanceProps } from "@/types";

const Performance = ({ data }: PerformanceProps) => {
  return (
    <div className="rounded-[1rem] bg-light p-5 dark:bg-dark-3">
      <h4 className="text-[1.125rem] font-semibold leading-[1.625rem] text-sc-1 dark:text-light">
        Performance
      </h4>
      <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
        Showing data from the last 30 days
      </p>

      <section className="mt-7 flex flex-col gap-6">
        {data.map((card, i) => (
          <PerformanceCard
            key={i}
            contentImg={card.contentImg}
            views={card.views}
            likes={card.likes}
            comments={card.comments}
          />
        ))}
      </section>
    </div>
  );
};

export default Performance;
