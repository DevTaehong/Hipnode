import { IconBlockProps } from "@/types/posts";

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

export default IconBlock;
