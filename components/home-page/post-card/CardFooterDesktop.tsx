import SocialMediaIcon from "./SocialMediaIcon";
import SocialStatistics from "./SocialStatistics";

const CardFooterDesktop = () => (
  <section className="hidden items-center justify-between md:flex">
    <div className="flex items-center">
      <SocialMediaIcon />
      <div className="flex flex-col pl-[0.625rem]">
        <p className="text-[0.875rem] leading-[1.375rem] text-sc-2 dark:text-sc-6">
          Pavel Gvay
        </p>
        <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
          3 Weeks ago
        </p>
      </div>
    </div>
    <div>
      <SocialStatistics />
    </div>
  </section>
);

export default CardFooterDesktop;
