import {
  PostImage,
  PostText,
  SocialMediaIcon,
  PostLabels,
  CardFooterDesktop,
  SocialStatistics,
} from ".";
import FillIcon from "../icons/fill-icons";

const PostCard = () => {
  return (
    <article className="flex rounded-xl bg-light p-[1.25rem] dark:bg-dark-3">
      <PostImage />
      <div className="ml-[0.875rem] flex grow flex-col justify-between">
        <div className="flex justify-between">
          <PostText />
          <div className="flex flex-row">
            <div className="flex md:hidden">
              <SocialMediaIcon />
            </div>
            <FillIcon.Heart className="hidden fill-sc-5 md:flex" />
          </div>
        </div>
        <PostLabels />
        <CardFooterDesktop />
        <div className="flex md:hidden">
          <SocialStatistics />
        </div>
      </div>
    </article>
  );
};

export default PostCard;
