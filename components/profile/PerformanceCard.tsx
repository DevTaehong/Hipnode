import Image from "next/image";

const PerformanceCard = () => {
  return (
    <div>
      <h4 className="text-[1.125rem] font-semibold leading-[1.625rem] text-sc-1 dark:text-light">
        Performance
      </h4>
      <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
        Showing data from the last 30 days
      </p>

      <section className="flex flex-col">
        <article className="">
          <Image src="" alt="" />

          <div className="flex justify-between">
            <section>
              <p>Views</p>
              <p>651,334</p>
            </section>

            <section>
              <p>Like</p>
              <p>651,334</p>
            </section>

            <section>
              <p>Comments</p>
              <p>651,334</p>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default PerformanceCard;
