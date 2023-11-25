import { formatDatePostFormat } from "@/utils";
import SocialMediaIcon from "./SocialMediaIcon";
import SocialStatistics from "./SocialStatistics";
import { CardFooterDesktopProps } from "@/types/posts";

const CardFooterDesktop = ({
  authorPicture,
  username,
  createdAt,
  socialCounts,
}: CardFooterDesktopProps) => (
  <section className="hidden items-center justify-between md:flex">
    <div className="flex items-center">
      <SocialMediaIcon authorPicture={authorPicture} />
      <div className="flex flex-col pl-[0.625rem]">
        <p className="text-[0.875rem] leading-[1.375rem] text-sc-2 dark:text-sc-6">
          {username}
        </p>
        <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
          {formatDatePostFormat(createdAt)}
        </p>
      </div>
    </div>
    <div>
      <SocialStatistics socialCounts={socialCounts} />
    </div>
  </section>
);

export default CardFooterDesktop;
