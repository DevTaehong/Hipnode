import { devInfo } from "@/constants";
import RightColumnWrapper from "./RightColumnWrapper";
import { usePost } from "@/context/posts-context/PostContext";
import DevelopmentInfo from "./DevelopmentInformation";

const MoreInformation = () => {
  const { currentPost } = usePost();

  if (!currentPost) return null;
  const { author } = currentPost;

  return (
    <RightColumnWrapper>
      <h2 className="text-[1.125rem] leading-[1.625rem] text-sc-2 dark:text-light-2">
        More from {author.username}
      </h2>

      <div className="flex flex-col items-start">
        <DevelopmentInfo devInfo={devInfo} />
      </div>
    </RightColumnWrapper>
  );
};

export default MoreInformation;
