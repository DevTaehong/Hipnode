import MoreInformationItem from "./MoreInformationItem";
import { devInfo } from "@/constants";
import RightColumnWrapper from "./RightColumnWrapper";
import { usePost } from "@/context/PostContext";

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
        {devInfo.map((item) => (
          <>
            <div className="my-[0.94rem] h-[0.05rem] w-full dark:bg-sc-3" />
            <div key={item.title}>
              <MoreInformationItem item={item} />
            </div>
          </>
        ))}
      </div>
    </RightColumnWrapper>
  );
};

export default MoreInformation;
