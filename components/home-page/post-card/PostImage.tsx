import Image from "next/image";

import { PostImageProps } from "@/types/homepage";

const PostImage = ({ postImage }: PostImageProps) => (
  <div className="">
    <figure className="flex h-[3.5rem] w-[3.5rem] grow rounded-2xl object-cover md:h-[9.75rem] md:w-[9.75rem]">
      <Image
        src={postImage}
        alt="post-card-placeholder"
        width={156}
        height={156}
        className="rounded-2xl"
      />
      <figcaption className="sr-only">
        Placeholder image for a social media post
      </figcaption>
    </figure>
  </div>
);

export default PostImage;
