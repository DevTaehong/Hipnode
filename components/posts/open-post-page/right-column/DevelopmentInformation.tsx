import React from "react";
import MoreInformationItem from "./MoreInformationItem";

type DevInfoItem = {
  title: string;
  tags: string;
};

type DevelopmentInfoProps = {
  devInfo: DevInfoItem[];
};

const DevelopmentInfo = ({ devInfo }: DevelopmentInfoProps) => {
  return (
    <>
      {devInfo.map((item) => (
        <MoreInformationItem item={item} key={item.title} />
      ))}
    </>
  );
};

export default DevelopmentInfo;
