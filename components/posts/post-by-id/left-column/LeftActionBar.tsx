import { iconData } from "@/constants/posts";
import IconBlock from "./LeftActionIconBlock";

const LeftActionBar = () => (
  <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
    {iconData.map((iconBlock, index) => (
      <IconBlock key={index} {...iconBlock} />
    ))}
  </aside>
);

export default LeftActionBar;
