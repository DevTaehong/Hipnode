import React from "react";
import MoreInformationItem from "./MoreInformationItem";

import { DevelopmentInfoProps } from "@/types/posts";

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
