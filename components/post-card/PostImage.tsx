import Image from "next/image";

const PostImage = () => (
  <div className="shrink-0 grow">
    <figure className="flex h-[3.5rem] w-[3.5rem] grow object-cover md:h-[9.75rem] md:w-[9.75rem]">
      <Image
        src="/postCardPlacholder.png"
        alt="post-card-placeholder"
        width={156}
        height={156}
      />
      <figcaption className="sr-only">
        Placeholder image for a social media post
      </figcaption>
    </figure>
  </div>
);

export default PostImage;