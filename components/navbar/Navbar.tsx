"use client";

import React from "react";
import Image from "next/image";

import { useTheme } from "@/context/ThemeProvider";
import { HipnodeIcon } from "../icons/outline-icons";

const Nav = () => {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <nav className="">
      <section>
        <HipnodeIcon styles="md:hidden" />
      </section>

      <section></section>
    </nav>
  );
};

export default Nav;
