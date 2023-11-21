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

export const GROUP = ["Alex", "Glen", "Taehong", "Tye", "Jay"];
export const POST = ["Newest", "New", "Old", "Older", "Oldest"];
export const POST_FORM_DEFAULT_VALUES: PostFormValuesType = {
  heading: "",
  content: "",
  image: "",
  group: "",
  contentType: "",
  tags: [],
};
