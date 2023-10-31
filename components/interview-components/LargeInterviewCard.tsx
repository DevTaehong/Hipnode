import React from "react";
import InterviewBannerImage from "./InterviewBannerImage";
import InterviewCardButtons from "./InterviewCardButtons";
import { formatSalary } from "@/utils";
import { InterviewProps } from ".";

const LargeInterviewCard = ({ interviewData }: InterviewProps) => {
  const {
    title,
    bannerImage,
    websiteLink,
    salary,
    salaryPeriod,
    updates,
    tags,
    details,
  } = interviewData;
  const interviewSalary = formatSalary(salary, salaryPeriod);
  return (
    <article className="bg-light_dark-3 flex max-w-[49rem] flex-col rounded-2xl">
      <InterviewBannerImage
        bannerImage={bannerImage}
        className="max-h-[17rem] w-full overflow-hidden"
        height={273}
        width={785}
      />
      <section className="flex flex-col gap-3.5 p-5 text-sc-3 md:gap-5">
        <h1 className="text-sc-2_light-2 semibold-16 sm:semibold-26">
          {title}
        </h1>
        <div className="flex w-full flex-col justify-between gap-3.5 sm:flex-row">
          <InterviewCardButtons
            interviewSalary={interviewSalary}
            updates={updates}
            websiteLink={websiteLink}
          />
          <div className="flex gap-6">
            {tags.map((tag: string) => (
              <span className="base-12 text-yellow-90 md:text-base" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <p className="base-12 sm:text-base">{details}</p>
      </section>
    </article>
  );
};

export default LargeInterviewCard;
