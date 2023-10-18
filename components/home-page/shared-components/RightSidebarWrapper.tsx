import { RightSidebarWrapperProps } from "@/types/homepage.index";

const RightSidebarWrapper = ({ children }: RightSidebarWrapperProps) => {
  return (
    <aside className="max-w-[20.9rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {children}
    </aside>
  );
};

export default RightSidebarWrapper;
