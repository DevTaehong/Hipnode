import Image from "next/image";

import { ImageWithCaptionProps } from "@/types/homepage";

const ImageWithCaption = ({
  imageSrc,
  imageAlt,
  imageWidth = 16,
  imageHeight = 16,
  className = "",
  caption = "",
}: ImageWithCaptionProps) => (
  <figure className="flex items-center flex-shrink-0">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      className={className}
    />
    <figcaption className="sr-only">{caption}</figcaption>
  </figure>
);

export default ImageWithCaption;
