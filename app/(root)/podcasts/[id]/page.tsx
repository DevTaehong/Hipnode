import { getPodcastById } from "@/lib/actions/podcast.actions";
import AudioPlayer from "@/components/AudioPlayer";
import LargePodcastCard from "@/components/LargePodcastCard";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const podcastId = parseInt(params.id);
  const podcast = await getPodcastById(podcastId);

  if (!podcast) {
    redirect("/podcast");
  }

  const { title, details, episodeNumber } = podcast;
  return (
    <main className="bg-light-2_dark-2 flex min-h-screen w-screen justify-center p-5 md:py-[1.875rem]">
      <section className="flex w-full max-w-3xl flex-col gap-5">
        <AudioPlayer podcast={podcast} />
        <LargePodcastCard
          title={title}
          details={details}
          episodeNumber={episodeNumber}
        />
      </section>
    </main>
  );
};

export default Page;
