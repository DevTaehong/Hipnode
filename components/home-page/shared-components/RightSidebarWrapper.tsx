import { RightSidebarWrapperProps } from "@/types/homepage.index";

const RightSidebarWrapper = ({ children }: RightSidebarWrapperProps) => {
  return (
    <aside className="p-[1.25rem] pb-0">
      <div className="rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
        {children}
      </div>
    </aside>
  );
};

export default RightSidebarWrapper;
