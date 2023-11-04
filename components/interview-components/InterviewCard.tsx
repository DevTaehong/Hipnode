import Link from "next/link";

import { formatSalary } from "@/utils";
import { InterviewCardProps } from "@/constants/interview";
import { InterviewBannerImage, InterviewCardInfo, InterviewHeader } from ".";

const InterviewCard = ({ interviewData }: InterviewCardProps) => {
  const {
    id,
    title,
    bannerImage,
    websiteLink,
    salary,
    salaryPeriod,
    updates,
    createdAt,
    creator: { name: username, picture: userImage },
  } = interviewData;
  const interviewSalary = formatSalary(salary, salaryPeriod);
  return (
    <article className="bg-light_dark-3 text-sc-2_light-2 flex flex-col justify-between gap-[1.875rem] rounded-2xl p-3.5 sm:p-5 md:flex-row xl:w-full xl:flex-row">
      <section className="flex w-full flex-col justify-between gap-5 sm:h-full">
        <InterviewHeader
          userImage={userImage}
          username={username}
          date={createdAt}
        />
        <InterviewBannerImage
          bannerImage={bannerImage}
          className="flex h-[12.5rem] w-full md:hidden lg:flex xl:hidden"
          height={360}
          width={560}
        />
        <h2 className="semibold-16 sm:semibold-18 ">{title}</h2>
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <InterviewCardInfo
            interviewSalary={interviewSalary}
            updates={updates}
            websiteLink={websiteLink}
          />
          <Link
            href={`/interviews/${id}`}
            className="flex-center semibold-14 h-[2.375rem] w-[5.9375rem] rounded bg-blue text-white sm:h-full"
          >
            Full Details
          </Link>
        </div>
      </section>
      <InterviewBannerImage
        bannerImage={bannerImage}
        className="hidden h-[11.25rem] w-full md:flex md:w-[17.5rem] lg:hidden xl:flex xl:w-[17.5rem]"
        height={360}
        width={560}
      />
    </article>
  );
};

export default InterviewCard;
