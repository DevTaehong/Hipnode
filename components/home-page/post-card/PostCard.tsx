import Link from "next/link";
import {
  PostImage,
  PostText,
  SocialMediaIcon,
  PostLabels,
  CardFooterDesktop,
  SocialStatistics,
} from ".";
import FillIcon from "../../icons/fill-icons";
import { PostCardProps } from "@/types/homepage";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const PostCard = ({
  post: {
    image,
    content,
    id,
    author: { picture, username },
  },
}: PostCardProps) => {
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(content);
    setHtmlString(sanitizedHtml);
  }, [content]);

  return (
    <article className="px-[1.25rem] lg:px-[0]">
      <Link href={`/posts/post/${id}`}>
        <div className="flex rounded-xl bg-light p-[1.25rem] dark:bg-dark-3">
          <PostImage postImage={image} />
          <div className="ml-[0.875rem] flex grow flex-col justify-between">
            <div className="flex justify-between">
              <PostText postContent={htmlString} />
              <div className="flex flex-row">
                <div className="flex md:hidden">
                  <SocialMediaIcon
                    authorPicture={picture ?? "/public/emoji.png"}
                  />
                </div>
                <FillIcon.Heart className="hidden fill-sc-5 md:flex" />
              </div>
            </div>
            <PostLabels />
            <CardFooterDesktop
              authorPicture={picture ?? "/public/emoji.png"}
              username={username}
            />
            <div className="flex md:hidden">
              <SocialStatistics />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
