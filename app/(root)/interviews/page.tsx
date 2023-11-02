import {
  InterviewCard,
  LargeInterviewCard,
} from "@/components/interview-components";
import { dummyInterviewData } from "@/constants/interview";

const Interviews = () => {
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
