import PerformanceCard from "./PerformanceCard";

const Performance = () => {
  return (
    <div>
      <h4 className="text-[1.125rem] font-semibold leading-[1.625rem] text-sc-1 dark:text-light">
        Performance
      </h4>
      <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
        Showing data from the last 30 days
      </p>

      <section className="flex flex-col">
        <PerformanceCard />
      </section>
    </div>
  );
};

export default Performance;
