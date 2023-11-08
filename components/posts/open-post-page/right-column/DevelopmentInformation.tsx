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
        <React.Fragment key={item.title}>
          <div className="my-[0.94rem] h-[0.05rem] w-full dark:bg-sc-3" />
          <MoreInformationItem item={item} />
        </React.Fragment>
      ))}
    </>
  );
};

export default DevelopmentInfo;
