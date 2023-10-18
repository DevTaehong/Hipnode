import { RightSidebarWrapperProps } from "@/types/homepage.index";

const RightSidebarWrapper = ({ children }: RightSidebarWrapperProps) => {
  return (
    <aside className="rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {children}
    </aside>
  );
};

export default RightSidebarWrapper;
