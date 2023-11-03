import { LargeInterviewCard } from "@/components/interview-components";
import {
  getInterviewById,
  getTagsByInterviewId,
} from "@/lib/actions/interview.actions";

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
  const interviewId = parseInt(params.id);
  const data = await getInterviewById(interviewId);
  const tags = await getTagsByInterviewId(interviewId);
  const tagNames = tags.map((tag) => tag.name);
  return (
    <main className="bg-light-2_dark-2 flex h-screen w-screen justify-center p-5">
      <LargeInterviewCard interviewData={data} tags={tagNames} />
    </main>
  );
};

export default Page;
