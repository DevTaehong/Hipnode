import { IconBlockProps } from "@/types/posts";

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex items-center gap-[0.875rem]">
    <div className="flex-center size-7 rounded-md">
      <IconComponent />
    </div>
    <p className="text-[1rem] font-semibold leading-6 text-sc-3 dark:text-sc-3">
      {`${label === "Report" ? "" : count} ${label}`}
    </p>
  </div>
);

export default IconBlock;
