import Image from "next/image";

import { PostImageProps } from "@/types/posts";

const PostImage = ({ src, alt, width, height }: PostImageProps) => (
  <div className="flex justify-center pb-[1.25rem]">
    <Image src={src} height={height} width={width} alt={alt} />
  </div>
);

export default PostImage;
