import React from "react";

import { StatsDescriptionProps } from "@/types";

const StatsDescription = ({ children, ...props }: StatsDescriptionProps) => (
  <p
    className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 lg:text-[0.875rem] lg:leading-[1.375rem]"
    {...props}
  >
    {children}
  </p>
);

export default StatsDescription;
