import Image from "next/image";

import { PerformanceCardProps } from "@/types";

const PerformanceCard = ({
  contentImg,
  views,
  likes,
  comments,
}: PerformanceCardProps) => {
  return (
    <article className="flex items-center">
      <Image
        src={contentImg}
        alt="content"
        width={50}
        height={50}
        className="mr-3.5 w-full rounded-[0.375rem] border border-contentCard shadow-contentCard"
      />

      <div className="flex justify-between gap-5">
        <section className="flex flex-col gap-1">
          <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
            Views
          </p>
          <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-3">
            {views}
          </p>
        </section>

        <section className="flex flex-col gap-1">
          <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
            Likes
          </p>
          <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-3">
            {likes}
          </p>
        </section>

        <section className="flex flex-col gap-1">
          <p className="text-[1rem] leading-[1.5rem] text-sc-3 dark:text-sc-6">
            Comments
          </p>
          <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-3">
            {comments}
          </p>
        </section>
      </div>
    </article>
  );
};

export default PerformanceCard;
