import { formatSalary } from "@/utils";
import { InterviewProps } from "@/constants/interview";
import { InterviewBannerImage, InterviewCardInfo, InterviewHeader } from ".";

const InterviewCard = ({ interviewData }: InterviewProps) => {
  const {
    username,
    userImage,
    title,
    bannerImage,
    websiteLink,
    salary,
    salaryPeriod,
    updates,
    date,
  } = interviewData;
  const interviewSalary = formatSalary(salary, salaryPeriod);
  return (
    <article className="bg-light_dark-3 text-sc-2_light-2 flex w-fit max-w-[49rem] flex-col justify-between gap-[1.875rem] rounded-2xl p-3.5 sm:flex-row sm:p-5">
      <section className="flex w-full max-w-[27.1875rem] flex-col justify-between gap-5 sm:h-full">
        <InterviewHeader
          userImage={userImage}
          username={username}
          date={date}
        />
        <InterviewBannerImage
          bannerImage={bannerImage}
          className="flex h-[12.5rem] w-full sm:hidden"
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
          <button className="flex-center semibold-14 h-[2.375rem] w-[5.9375rem] rounded bg-blue text-white sm:h-full">
            Full Details
          </button>
        </div>
      </section>
      <InterviewBannerImage
        bannerImage={bannerImage}
        className="hidden h-[11.25rem] w-[17.5rem] sm:flex"
        height={360}
        width={560}
      />
    </article>
  );
};

export default InterviewCard;
