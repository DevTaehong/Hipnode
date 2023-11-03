"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OutlineIcon from "../icons/outline-icons";
import { cn } from "@/lib/utils";
import { capitalise } from "@/utils";

const Categories = ({
  filters,
  page,
  urlFilter,
  className,
}: {
  filters: any[];
  page: string;
  urlFilter: string;
  className: string;
}) => {
  const router = useRouter();
  const [selectFilters, setSelectFilters] = useState<number[]>([]);

  const queryString = selectFilters
    .map((filter) => `${urlFilter}=${filter}`)
    .join("&");

  useEffect(() => {
    router.push(`/${page}?${queryString}`);
  }, [selectFilters]);

  const toggleCategory = (category: number) => {
    if (selectFilters.includes(category)) {
      setSelectFilters(selectFilters.filter((item) => item !== category));
    } else {
      setSelectFilters([...selectFilters, category]);
    }
    router.push(`/${page}?${queryString}`);
  };

  const title = capitalise(urlFilter);

  return (
    <div
      className={`bg-light_dark-3 flex h-fit w-full flex-col gap-3 rounded-2xl p-5 ${className}`}
    >
      <h2 className="semibold-18 text-sc-2_light">Filter by {title}</h2>
      {filters.map((category) => (
        <div key={category.id} className="flex w-full justify-between gap-2">
          <label
            className="text-sc-2_light semibold-12"
            htmlFor={category.name}
          >
            {category.name}
          </label>
          <div
            className={cn(
              "mt-0.5 flex h-4 min-h-[1rem] w-4 min-w-[1rem] cursor-pointer items-center justify-center rounded-sm border transition duration-200",
              selectFilters.includes(category.id) && "border-red bg-red",
              !selectFilters.includes(category.id) && "border-sc-3"
            )}
            onClick={() => toggleCategory(category.id)}
          >
            <OutlineIcon.Success
              className={`${
                !selectFilters.includes(category.id)
                  ? "fill-none"
                  : "fill-white"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
