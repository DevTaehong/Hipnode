import { PostFormValuesType } from "@/types/posts";
import {
  OrangeHeartIcon,
  CommentIcon,
  ShareIcon,
  ReportIcon,
} from "@/components/icons/open-post-icons/PostIcons";

export const iconData = [
  { label: "Heart", count: 20000, IconComponent: OrangeHeartIcon },
  { label: "Comments", count: 20000, IconComponent: CommentIcon },
  { label: "Share", count: 20000, IconComponent: ShareIcon },
  { label: "Report", IconComponent: ReportIcon },
];

export const PostFormDefaultValues: PostFormValuesType = {
  heading: "",
  content: "",
  image: "",
  group: "",
  contentType: "",
  tags: [],
};
