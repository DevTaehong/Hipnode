import { redirect } from "next/navigation";

import { getPodcastById } from "@/lib/actions/podcast.actions";
import AudioPlayer from "@/components/podcast-components/AudioPlayer";
import LargePodcastCard from "@/components/podcast-components/LargePodcastCard";
import { getBucketUrls } from "@/utils/getBucketURLs";
interface PodcastPageProps {
  params: {
    id: string;
  };
}

const PodcastPage = async ({ params }: PodcastPageProps) => {
  const podcastId = parseInt(params.id);
  const podcast = await getPodcastById(podcastId);
  const bucketUrls = await getBucketUrls("podcasts");

  if (!podcast) {
    redirect("/podcast");
  }

  const { title, details, episodeNumber } = podcast;
  return (
    <main className="bg-light-2_dark-2 flex min-h-screen w-screen justify-center p-5 md:py-[1.875rem]">
      <section className="flex h-fit w-full max-w-3xl flex-col gap-5">
        <AudioPlayer podcast={podcast} url={bucketUrls[1]} />
        <LargePodcastCard
          title={title}
          details={details}
          episodeNumber={episodeNumber}
        />
      </section>
    </main>
  );
};

export default PodcastPage;
