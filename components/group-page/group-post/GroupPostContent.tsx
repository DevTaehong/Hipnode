import Image from "next/image";

import { CardContent } from "@/components/ui/card";
import GroupPostIcons from "@/components/group-page/group-post/GroupPostIcons";
import SanatizedHtml from "@/components/posts/post-by-id/main-content/SanatizedHtml";

const GroupPostContent = ({
  image,
  groupName,
  heading,
  content,
  id,
  hasUserLiked,
  authorId,
}: {
  image: string;
  groupName: string;
  heading: string;
  content: string;
  id: number;
  hasUserLiked: boolean;
  authorId: number;
}) => (
  <CardContent className="flex flex-col gap-[0.62rem]">
    <Image
      className="w-full rounded-[0.65rem]"
      src={image}
      width={315}
      height={146}
      alt={`Post image from a ${groupName} group`}
    />
    <GroupPostIcons
      id={id}
      hasUserLiked={hasUserLiked}
      postHeading={heading}
      authorId={authorId}
    />
    <h6 className="semibold-14 font-feature line-clamp-3">{heading}</h6>
    <SanatizedHtml content={content} className="regular-12 line-clamp-6" />
  </CardContent>
);

export default GroupPostContent;
