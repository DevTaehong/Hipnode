import Image from "next/image";

import { Episode } from "@/types";
interface PodcastCardProps {
  info: Episode;
}

const PodcastCard = ({ info }: PodcastCardProps) => {
  return (
    <article className="bg-light_dark-3 flex flex-col rounded-2xl p-3.5">
      <header>
        <h2 className="text-sc-1_light-2 semibold-16">{info.title}</h2>
      </header>
      <section className="mt-2.5">
        <p className="text-sc-3_light-6 base-12">{info.details}</p>
      </section>
      <footer className="mt-5 flex items-center gap-2.5">
        <figure>
          <Image
            src={info.image}
            alt="Host of the podcast"
            height={30}
            width={30}
            className="max-h-[1.875rem] rounded-full"
          />
        </figure>
        <div className="flex flex-col">
          <h3 className="text-sc-2_light semibold-14">Host Name</h3>
          <p className="regular-10 text-sc-3">Podcast Location</p>
        </div>
      </footer>
    </article>
  );
};

export default PodcastCard;
