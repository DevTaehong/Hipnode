import MoreInformationItem from "./MoreInformationItem";
import { DevelopmentInfoProps } from "@/types/posts";

const DevelopmentInformation = ({ devInfo }: DevelopmentInfoProps) => {
  return (
    <>
      {devInfo.map((item) => (
        <MoreInformationItem item={item} key={item.title} />
      ))}
    </>
  );
};

export default DevelopmentInformation;
