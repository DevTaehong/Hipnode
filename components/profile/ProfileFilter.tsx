"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalise } from "@/utils";

import { Button } from "../ui/button";
import { profileFilters } from "@/constants";

const ProfileFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "posts");

  useEffect(() => {
    router.push(`profile?search=${search}`);
  }, [search, router]);

  return (
    <div className="flex w-full justify-between gap-5 overflow-y-hidden rounded-[0.875rem] bg-light p-2.5 dark:bg-dark-3 md:rounded-[1.25rem] md:px-7 md:py-5">
      {profileFilters.map((filter) => (
        <Button
          key={filter}
          className={`rounded-[0.875rem] px-2.5 py-1 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 hover:bg-red-80 hover:text-light dark:text-sc-6 lg:rounded-[1.5rem] lg:px-5 lg:py-2 lg:text-[1.125rem] lg:leading-[1.625rem] ${
            search === filter && "bg-red-80 text-light"
          }`}
          onClick={() => setSearch(filter)}
        >
          {capitalise(filter)}
        </Button>
      ))}
    </div>
  );
};

export default ProfileFilter;
