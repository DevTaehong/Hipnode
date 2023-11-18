import { iconData } from "@/constants/posts";
import { IconBlockProps } from "@/types/posts";

const LeftActionBar = () => (
  <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
    {iconData.map((iconBlock, index) => (
      <IconBlock key={index} {...iconBlock} />
    ))}
  </aside>
);

export default LeftActionBar;

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex items-center gap-[0.875rem]">
    <div className="flex-center h-[1.75rem] w-[1.75rem] rounded-md">
      <IconComponent />
    </div>
    {count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        {count} {label}
      </p>
    )}
    {!count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        {label}
      </p>
    )}
  </div>
);
