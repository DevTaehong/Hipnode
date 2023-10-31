import Image from "next/image";
import { formatInterviewDate, formatSalary } from "@/utils";
import OutlineIcon from "../icons/outline-icons";
import InterviewBannerImage from "./InterviewBannerImage";
import InterviewCardButtons from "./InterviewCardButtons";
import { InterviewProps } from ".";

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
  const interviewDate = formatInterviewDate(date);
  const interviewSalary = formatSalary(salary, salaryPeriod);
  return (
    <article className="bg-light_dark-3 text-sc-2_light-2 flex w-fit max-w-[49rem] flex-col justify-between gap-[1.875rem] rounded-2xl p-3.5 sm:flex-row sm:p-5">
      <header className="flex w-full max-w-[27.1875rem] flex-col justify-between gap-5 sm:h-full">
        <section className="flex w-full justify-between">
          <div className="flex gap-4">
            <Image
              src={userImage}
              height={40}
              width={40}
              alt="user image"
              className="h-10 w-10 rounded-full md:h-11 md:w-11"
            />
            <div className="flex flex-col">
              <p className="semibold-14 sm:semibold-16 ">{username}</p>
              <p className="base-12 sm:base-14 text-sc-3">{interviewDate}</p>
            </div>
          </div>
          <OutlineIcon.MoreVertical />
        </section>
        <InterviewBannerImage
          bannerImage={bannerImage}
          className="flex h-[12.5rem] w-full sm:hidden"
          height={360}
          width={560}
        />
        <h2 className="semibold-16 sm:semibold-18 ">{title}</h2>
        <InterviewCardButtons
          interviewSalary={interviewSalary}
          updates={updates}
          websiteLink={websiteLink}
        />
      </header>
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
