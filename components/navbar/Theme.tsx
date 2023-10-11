"use client";

import React from "react";
import FillIcon from "../icons/fill-icons";
import { useTheme } from "@/context/ThemeProvider";

const Theme = () => {
  const { mode, setMode } = useTheme();

  const setTheme = () => {
    if (mode === "light") {
      setMode("dark");
      localStorage.theme = "dark";
    } else {
      setMode("light");
      localStorage.theme = "light";
    }
  };

  return (
    <section
      className="flex cursor-pointer items-center gap-1 rounded-full bg-light-2 p-1 dark:bg-dark-3"
      onClick={setTheme}
    >
      <div className="rounded-full bg-light p-1 dark:bg-dark-2">
        <FillIcon.Sun className="fill-sc-4 dark:fill-sc-6" />
      </div>

      <div className="rounded-full bg-light-2 p-1 dark:bg-dark-4">
        <FillIcon.Moon className="fill-sc-4 dark:fill-sc-6" />
      </div>
    </section>
  );
};

export default Theme;
