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

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="px-[1.25rem] lg:px-[0]">
      <div className="flex rounded-xl bg-light p-[1.25rem] dark:bg-dark-3">
        <PostImage postImage={post?.image} />
        <div className="ml-[0.875rem] flex grow flex-col justify-between">
          <div className="flex justify-between">
            <PostText postContent={post?.content} />
            <div className="flex flex-row">
              <div className="flex md:hidden">
                <SocialMediaIcon authorPicture={post?.author?.picture} />
              </div>
              <FillIcon.Heart className="hidden fill-sc-5 md:flex" />
            </div>
          </div>
          <PostLabels />
          <CardFooterDesktop
            authorPicture={post?.author?.picture}
            username={post?.author.username}
          />
          <div className="flex md:hidden">
            <SocialStatistics />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
