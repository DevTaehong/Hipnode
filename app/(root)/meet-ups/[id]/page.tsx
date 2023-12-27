import { getMeetupById } from "@/lib/actions/meetup.actions";
import LargeMeetupCard from "@/components/meetup-components/LargeMeetupCard";

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
  const meetupId = parseInt(params.id);
  const data = await getMeetupById(meetupId);
  if (!data) return;

  return (
    <main className="bg-light-2_dark-2 flex h-screen w-screen justify-center p-5">
      <LargeMeetupCard meetupData={data} />
    </main>
  );
};

export default Page;
