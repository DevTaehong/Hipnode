import { redirect } from "next/navigation";

import { getPodcastByIdPage } from "@/lib/actions/podcast.actions";
import { AudioPlayer, LargePodcastCard } from "@/components/podcast-components";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
interface PodcastPageProps {
  params: {
    id: string;
  };
}

const PodcastPage = async ({ params }: PodcastPageProps) => {
  const podcastId = parseInt(params.id);
  const podcast = await getPodcastByIdPage({ podcastId });
  // FIXME - find why this function is not working
  // const bucketUrls = await getBucketUrls("podcasts");

  if (!podcast) {
    redirect("/podcasts");
  }

  const { title, details, episodeNumber } = podcast;

  const randomIndex = getRandomInt(0, 2);

  const bucketUrls = [
    "https://tuugxdkqwquvuufuvahi.supabase.co/storage/v1/object/public/podcasts/62806be6-364d-270f-b5e4-22d05e308bde.mp3",
    "https://tuugxdkqwquvuufuvahi.supabase.co/storage/v1/object/public/podcasts/podcast2.mp3",
    "https://tuugxdkqwquvuufuvahi.supabase.co/storage/v1/object/public/posts/podcast3.mp3?t=2024-10-29T01%3A29%3A15.240Z",
    "https://tuugxdkqwquvuufuvahi.supabase.co/storage/v1/object/public/posts/podcast4.mp3?t=2024-10-29T01%3A29%3A20.101Z",
    "https://tuugxdkqwquvuufuvahi.supabase.co/storage/v1/object/public/posts/podcast5.mp3?t=2024-10-29T01%3A29%3A27.356Z",
  ];

  return (
    <main className="dynamic-pages-styles">
      <section className="relative flex h-fit w-full max-w-3xl flex-col gap-5">
        <AudioPlayer
          podcast={podcast}
          url={bucketUrls?.[randomIndex]}
          podcastId={podcastId}
        />
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
