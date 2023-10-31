import { IconBlockProps } from "@/types/create-post-form";

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex gap-[0.875rem]">
    <div className="h-[1.75rem] w-[1.75rem] rounded-md">
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
