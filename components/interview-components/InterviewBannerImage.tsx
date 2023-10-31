import Image, { StaticImageData } from "next/image";

type InterviewBannerImageType = {
  bannerImage: string | StaticImageData;
  className: string;
  height: number;
  width: number;
  roundedTop?: boolean;
};

const InterviewBannerImage = ({
  bannerImage,
  className,
  height,
  width,
  roundedTop = false,
}: InterviewBannerImageType) => {
  const borderRadius = roundedTop ? "rounded-t-lg" : "rounded-lg";
  return (
    <figure className={className}>
      <Image
        src={bannerImage}
        height={height}
        width={width}
        alt="banner image"
        style={{ objectFit: "cover" }}
        className={borderRadius}
      />
    </figure>
  );
};

export default InterviewBannerImage;
