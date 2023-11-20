import { DevelopmentInfoProps, MoreInformationItemProps } from "@/types/posts";

const DevelopmentInformation = ({ devInfo }: DevelopmentInfoProps) => {
  return (
    <>
      {devInfo.map((item) => (
        <MoreInformationItem item={item} key={item.title} />
      ))}
    </>
  );
};

export default DevelopmentInformation;

const MoreInformationItem = ({
  item: { title, tags },
}: MoreInformationItemProps) => (
  <>
    <aside className="my-[0.94rem]">
      <div className="h-[0.05rem] w-full dark:bg-sc-3" />
      <div className="max-w-[20.3rem] ">
        <h3 className="text-[0.75rem] leading-[1.125rem] text-sc-2 dark:text-light-2">
          {title}
        </h3>
        <p className="text-[1rem] leading-[1.625rem] text-sc-3">{tags}</p>
      </div>
    </aside>
  </>
);
