"use client";

import { Button } from "../ui/button";
import { profileFilters } from "@/constants";
import { useState, useEffect } from "react";

const ProfileFilter = () => {
  const [activeFilter, setActiveFilter] = useState("");

  // TODO: Add logic to filter content cards based on activeFilter
  useEffect(() => {}, [activeFilter]);

  return (
    <div className="flex w-full justify-between gap-5 overflow-y-hidden rounded-[0.875rem] bg-light p-2.5 dark:bg-dark-3 md:rounded-[1.25rem] md:px-7 md:py-5">
      {profileFilters.map((filter) => (
        <Button
          key={filter}
          className={`rounded-[0.875rem] px-2.5 py-1 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6 lg:rounded-[1.5rem] lg:px-5 lg:py-2 lg:text-[1.125rem] lg:leading-[1.625rem] ${
            activeFilter === filter && "bg-red-80 text-light"
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default ProfileFilter;
