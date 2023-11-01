import { iconData } from "@/constants";
import IconBlock from "./LeftActionIconBlock";
import LeftColumnWrapper from "./LeftColumnWrapper";

const LeftActionBar = () => (
  <LeftColumnWrapper>
    {iconData.map((iconBlock, index) => (
      <IconBlock key={index} {...iconBlock} />
    ))}
  </LeftColumnWrapper>
);

export default LeftActionBar;
