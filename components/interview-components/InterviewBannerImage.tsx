import Image, { StaticImageData } from "next/image";

type InterviewBannerImageType = {
  bannerImage: string | StaticImageData;
  className: string;
  height: number;
  width: number;
};

const InterviewBannerImage = ({
  bannerImage,
  className,
  height,
  width,
}: InterviewBannerImageType) => {
  return (
    <figure className={className}>
      <Image
        src={bannerImage}
        height={height}
        width={width}
        alt="banner image"
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </figure>
  );
};

export default InterviewBannerImage;
