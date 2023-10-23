import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./ArrowIcon";
import { ArrowLargeDown, ArrowLargeRight } from "./ArrowLargeIcon";
import BloggingIcon from "./BloggingIcon";
import CheckboxIcon from "./CheckboxIcon";
import CheckmarkIcon from "./CheckmarkIcon";
import CommentIcon from "./CommentIcon";
import DevIcon from "./DevIcon";
import FollowingIcon from "./FollowingIcon";
import { Headline, Underline, Italic, Strikethrough, Bold } from "./FormatIcon";
import FrameIcon from "./FrameIcon";
import FrameNumber from "./FrameNumber";
import HeartIcon from "./HeartIcon";
import {
  Comment,
  Edit,
  Follow,
  ImageIcon,
  Info,
  Link,
  NewSquare,
  Tutorial,
  Seo,
  Share,
  View,
} from "./Icon";
import IconAlt from "./IconAlt";
import NewIcon from "./NewIcon";
import PopularIcon from "./PopularIcon";
import PostIcon from "./PostIcon";
import SearchIcon from "./SearchIcon";
import Share2Icon from "./Share2Icon";
import SocialIcon from "./SocialIcon";
import VoiceIcon from "./VoiceIcon";

// Still working on this
export { default as FrameIcon } from "./FrameIcon";
export { default as DevIcon } from "./DevIcon";
export { default as SearchIcon } from "./SearchIcon";
export { default as IconAlt } from "./IconAlt";
export { default as SocialIcon } from "./SocialIcon";
export { default as BloggingIcon } from "./BloggingIcon";
export { default as VoiceIcon } from "./VoiceIcon";
export { default as HeartIcon } from "./HeartIcon";
export { default as PopularIcon } from "./PopularIcon";
export { default as FollowingIcon } from "./FollowingIcon";
export { default as CheckboxIcon } from "./CheckboxIcon";
export { default as NewIcon } from "./NewIcon";
export { default as Share2Icon } from "./Share2Icon";
export { default as CheckmarkIcon } from "./CheckmarkIcon";

interface OutlineIconProps {
  children?: ReactNode;
  className?: string;
  checked?: boolean;
  color?: string;
  secondaryColor?: string;
  fillColor?: string;
  strokeColor?: string;
}

const OutlineIcon = ({ children, className }: OutlineIconProps) => {
  const styles = className || "fill-[#C5D0E6] dark:fill-[#F4F6F8]";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={styles}
    >
      {children}
    </svg>
  );
};

OutlineIcon.ArrowLeft = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowLeft />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowRight = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowRight />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowLargeDown = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "stroke-[#3F4354] dark:stroke-sc-3"}>
      <ArrowLargeDown />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowLargeRight = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "stroke-[#3F4354] dark:stroke-sc-3"}>
      <ArrowLargeRight />
    </OutlineIcon>
  );
};

OutlineIcon.Blogging = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <BloggingIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Checkbox = function Icon({ checked }: OutlineIconProps) {
  return <CheckboxIcon checked={checked} />;
};

OutlineIcon.Checkmark = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#347AE2]"}>
      <CheckmarkIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Comment = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <CommentIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Dev = function Icon({ className }: OutlineIconProps) {
  return (
    <DevIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"} />
  );
};

OutlineIcon.Following = function Icon({ color }: OutlineIconProps) {
  return <FollowingIcon color={color || "#6570F7"} />;
};

OutlineIcon.Headline = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Headline />
    </OutlineIcon>
  );
};

OutlineIcon.Underline = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Underline />
    </OutlineIcon>
  );
};

OutlineIcon.Italic = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Italic />
    </OutlineIcon>
  );
};

OutlineIcon.Strikethrough = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Strikethrough />
    </OutlineIcon>
  );
};

OutlineIcon.Bold = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Bold />
    </OutlineIcon>
  );
};

OutlineIcon.FrameCenter = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Center />
    </FrameIcon>
  );
};

OutlineIcon.FrameLeft = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Left />
    </FrameIcon>
  );
};

OutlineIcon.FrameRight = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Right />
    </FrameIcon>
  );
};

OutlineIcon.FramePoint = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Point />
    </FrameIcon>
  );
};

OutlineIcon.FrameNumber = function Icon({
  fillColor,
  strokeColor,
}: OutlineIconProps) {
  return (
    <FrameNumber
      fillColor={fillColor || "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      strokeColor={strokeColor || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Heart = function Icon({ className }: OutlineIconProps) {
  return (
    <HeartIcon
      className={className || "fill-[#3F4354] dark:fill-[#F7F7F7] dark:invert"}
    />
  );
};

OutlineIcon.Edit = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Edit />
    </OutlineIcon>
  );
};

OutlineIcon.Follow = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Follow />
    </OutlineIcon>
  );
};

OutlineIcon.ImageIcon = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ImageIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Info = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Info />
    </OutlineIcon>
  );
};

OutlineIcon.Link = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Link />
    </OutlineIcon>
  );
};

OutlineIcon.NewSquare = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#0ECC8D]"}>
      <NewSquare />
    </OutlineIcon>
  );
};

OutlineIcon.Tutorial = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Tutorial />
    </OutlineIcon>
  );
};

OutlineIcon.Seo = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Seo />
    </OutlineIcon>
  );
};

OutlineIcon.Share = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Share />
    </OutlineIcon>
  );
};

OutlineIcon.View = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <View />
    </OutlineIcon>
  );
};

OutlineIcon.Bitcoin = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Bitcoin />
    </IconAlt>
  );
};

OutlineIcon.Close = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Close />
    </IconAlt>
  );
};

OutlineIcon.Design = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Design />
    </IconAlt>
  );
};

OutlineIcon.Expand = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Expand />
    </IconAlt>
  );
};

OutlineIcon.Mention = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Mention />
    </IconAlt>
  );
};

OutlineIcon.More = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.More />
    </IconAlt>
  );
};

OutlineIcon.Post = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Post />
    </IconAlt>
  );
};

OutlineIcon.Success = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Success />
    </IconAlt>
  );
};

OutlineIcon.Upload = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Upload />
    </IconAlt>
  );
};

OutlineIcon.Web = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Web />
    </IconAlt>
  );
};

OutlineIcon.ImageWide = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.ImageWide />
    </IconAlt>
  );
};

OutlineIcon.New = function Icon({ color, secondaryColor }: OutlineIconProps) {
  return (
    <OutlineIcon>
      <NewIcon
        color={color || "fill-[#0ECC8D]"}
        secondaryColor={secondaryColor || "fill-light-2"}
      />
      ;
    </OutlineIcon>
  );
};

OutlineIcon.Popular = function Icon({ className }: OutlineIconProps) {
  return <PopularIcon className={className || "fill-[#EEA956]"} />;
};

OutlineIcon.Post = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#97989D]"}>
      <PostIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Search = function Icon({ className }: OutlineIconProps) {
  return (
    <SearchIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Share2 = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Share2Icon />
    </OutlineIcon>
  );
};

OutlineIcon.Twitter = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon>
      <SocialIcon.Twitter
        className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      />
    </SocialIcon>
  );
};

OutlineIcon.Instagram = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <SocialIcon.Instagram />
    </SocialIcon>
  );
};

OutlineIcon.Facebook = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <SocialIcon.Facebook />
    </SocialIcon>
  );
};

OutlineIcon.LinkedIn = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon>
      <SocialIcon.LinkedIn
        className={className || "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      />
    </SocialIcon>
  );
};

OutlineIcon.Voice = function Icon({ className }: OutlineIconProps) {
  return (
    <VoiceIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

export default OutlineIcon;
