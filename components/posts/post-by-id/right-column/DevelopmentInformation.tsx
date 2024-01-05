import { DevelopmentInfoProps } from "@/types/posts";

const DevelopmentInformation = ({ devInfo }: DevelopmentInfoProps) => {
  return (
    <>
      {devInfo.map((item, index) => (
        <aside key={index} className="my-[0.94rem]">
          <div className="h-[0.05rem] w-full dark:bg-sc-3" />
          <div className="max-w-[20.3rem] ">
            <h3 className="text-[0.75rem] leading-[1.125rem] text-sc-2 dark:text-light-2">
              {item.heading}
            </h3>
            <p className="text-base leading-[1.625rem] text-sc-3">
              {item.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
          </div>
        </aside>
      ))}
    </>
  );
};

export default DevelopmentInformation;
