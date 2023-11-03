import { ColumnWrapperType } from "@/types/posts";

const LeftColumnWrapper = ({ children }: ColumnWrapperType) => {
  return (
    <aside className="flex min-w-[13rem] flex-col justify-start rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {children}
    </aside>
  );
};

export default LeftColumnWrapper;
