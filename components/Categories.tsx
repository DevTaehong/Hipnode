"use client";

import { Shows } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IconAlt } from "./icons/outline-icons";

const Categories = ({ shows }: { shows: Shows[] }) => {
  const router = useRouter();
  const [selectFilters, setSelectFilters] = useState<number[]>([]);

  const queryString = selectFilters.map((filter) => `show=${filter}`).join("&");

  useEffect(() => {
    router.push(`/podcasts?${queryString}`);
  }, [selectFilters]);

  const toggleCategory = (category: number) => {
    if (selectFilters.includes(category)) {
      setSelectFilters(selectFilters.filter((item) => item !== category));
    } else {
      setSelectFilters([...selectFilters, category]);
    }
    router.push(`/podcasts?${queryString}`);
  };

  return (
    <div className="bg-light_dark-3 flex h-fit w-full flex-col gap-3 rounded-2xl p-5">
      <h2 className="semibold-18 text-sc-2_light">Filter by Show</h2>
      {shows.map((show) => (
        <div key={show.id} className="flex w-full items-center justify-between">
          <label className="text-sc-2_light semibold-12" htmlFor={show.name}>
            {show.name}
          </label>
          <div
            className={`flex h-4 min-h-[1rem] w-4 min-w-[1rem] cursor-pointer items-center justify-center rounded-sm border transition duration-200 ${
              selectFilters.includes(show.id)
                ? "border-red bg-red"
                : "border-sc-3"
            }`}
            onClick={() => toggleCategory(show.id)}
          >
            <IconAlt.Success
              wrapperStyles={`h-3 w-3 ${
                !selectFilters.includes(show.id) && "hidden"
              }`}
              className="fill-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
