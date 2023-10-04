import {
  ArrowIcon,
  ArrowLargeIcon,
  FrameIcon,
  TextFormatIcon,
  SocialMediaIcon,
  OutlineIcon,
  AltOutlineIcon,
} from "@/components/icons/outline-icons";
const page = () => {
  return (
    <div className="flex h-screen w-screen items-center">
      <div className="flex flex-wrap">
        <ArrowIcon.Left />
        <ArrowLargeIcon.Right />
        <FrameIcon.Right />
        <TextFormatIcon.Bold />
        <SocialMediaIcon.LinkedIn />
        <OutlineIcon.NewSquare />
        <AltOutlineIcon.ImageWide />
      </div>
    </div>
  );
};

export default page;
