import { RightSidebarWrapperProps } from "@/types/homepage";

const RightSidebarWrapper = ({ children }: RightSidebarWrapperProps) => (
  <aside className="p-[1.25rem] pb-0">{children}</aside>
);

export default RightSidebarWrapper;
