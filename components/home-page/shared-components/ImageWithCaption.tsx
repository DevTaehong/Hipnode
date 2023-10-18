import Image from "next/image";

interface ImageWithCaptionProps {
  imageSrc: string;
  imageTitle?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  caption?: string;
}

const ImageWithCaption = ({
  imageSrc,
  imageAlt,
  imageWidth = 16,
  imageHeight = 16,
  className = "",
  caption = "",
}: ImageWithCaptionProps) => (
  <figure className="flex items-center">
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
