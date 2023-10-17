"use client";

import { useState } from "react";
import { IconAlt } from "./icons/outline-icons";

const dummyDataPodcasts = {
  heading: "Filter By Show",
  categories: ["Indie Bites", "Software Social", "Hipnode", "Free"],
};

const Categories = () => {
  const [selectFilters, setSelectFilters] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectFilters.includes(category)) {
      setSelectFilters(selectFilters.filter((item) => item !== category));
    } else {
      setSelectFilters([...selectFilters, category]);
    }
  };

  return (
    <div className="bg-light_dark-3 flex h-fit w-full flex-col gap-3 rounded-2xl p-5">
      <h2 className="semibold-18 text-sc-2_light">
        {dummyDataPodcasts.heading}
      </h2>
      {dummyDataPodcasts.categories.map((category) => (
        <div
          key={category}
          className="flex w-full items-center justify-between"
        >
          <label className="text-sc-2_light semibold-12" htmlFor={category}>
            {category}
          </label>
          <div
            className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border transition duration-200 ${
              selectFilters.includes(category)
                ? "border-red bg-red"
                : "border-sc-3"
            }`}
            onClick={() => toggleCategory(category)}
          >
            <IconAlt.Success
              wrapperStyles={`h-3 w-3 ${
                !selectFilters.includes(category) && "hidden"
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
