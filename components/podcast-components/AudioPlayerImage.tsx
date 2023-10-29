import Image from "next/image";

const AudioPlayerImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="flex h-fit">
      <div className="flex h-full max-h-[3.125rem] min-h-[3.125rem] w-full min-w-[3.125rem] max-w-[3.125rem] md:min-h-[9.375rem] md:min-w-[9.375rem]">
        <Image
          src={imageSrc}
          alt="Podcast Image"
          height={150}
          width={150}
          className="z-10 rounded-lg"
        />
      </div>
      <div className="flex h-full max-h-[2.5rem] min-h-[2.5rem] w-full min-w-[2.5rem] max-w-[2.5rem] -translate-x-2.5 self-center md:min-h-[8.125rem] md:min-w-[8.125rem] md:-translate-x-8">
        <Image
          src="/images/record-player.svg"
          alt="Podcast Image"
          height={130}
          width={130}
        />
      </div>
    </div>
  );
};

export default AudioPlayerImage;
