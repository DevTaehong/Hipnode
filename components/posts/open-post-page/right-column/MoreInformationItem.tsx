import { MoreInformationItemProps } from "@/types/create-post-form";

const MoreInformationItem = ({
  item: { title, tags },
}: MoreInformationItemProps) => (
  <>
    <h3 className="text-[0.75rem] leading-[1.125rem] text-sc-2 dark:text-light-2">
      {title}
    </h3>
    <p className="text-[1rem] leading-[1.625rem] text-sc-3">{tags}</p>
  </>
);

export default MoreInformationItem;
