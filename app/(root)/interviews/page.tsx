import {
  InterviewCard,
  LargeInterviewCard,
} from "@/components/interview-components";
import { dummyInterviewData } from "@/constants/interview";
import { createInterview } from "@/lib/actions/interview.actions";

const Interviews = async () => {
  const newInterview = await createInterview({
    creatorId: 1,
    title: "title",
    bannerImage: "test",
    details: "test",
    websiteLink: "/",
    salary: 50000,
    salaryPeriod: "year",
    updates: 23,
  });
  console.log(newInterview);

  return (
    <main className="flex h-screen w-screen bg-light-3 dark:bg-dark-1">
      <div className="flex w-full flex-col gap-2 p-2">
        <InterviewCard interviewData={dummyInterviewData} />
        <LargeInterviewCard interviewData={dummyInterviewData} />
      </div>
    </main>
  );
};

export default Interviews;
