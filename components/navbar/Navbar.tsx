"use client";

import React from "react";
import Link from "next/link";
import { HipnodeIcon, SearchIcon } from "../icons/outline-icons";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import FillIcon from "../icons/fill-icons";
import { UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-between flex w-full gap-5 bg-light px-5 py-3 dark:bg-dark-3">
      <section className="flex items-center gap-5">
        <Link href="/">
          <HipnodeIcon styles="lg:hidden" />
          <HipnodeHeaderLogo styles="hidden lg:flex" />
        </Link>

        <SearchIcon className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 lg:hidden" />
      </section>

      <section className="hidden lg:flex lg:items-center lg:gap-5">
        {navLinks.map(({ name, link }) => {
          const Icon = FillIcon[name as keyof typeof FillIcon];

          const isActive = pathname === link;

          return (
            <Link
              href={link}
              key={name}
              className={`cursor-pointer rounded-lg p-2 ${isActive && "bg-red"}`}
            >
              <Icon className={`${isActive ? "fill-light" : ""}`} />
            </Link>
          );
        })}
      </section>

      <section className="hidden w-full max-w-[400px] items-center gap-2 rounded-lg bg-light-2 px-3 dark:bg-dark-4 lg:flex">
        <Input
          type="text"
          placeholder="Type here to search..."
          className="no-focus border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        />

        <SearchIcon className="cursor-pointer stroke-sc-4" />
      </section>

      <section className="flex items-center gap-6">
        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <FillIcon.Message className="fill-sc-4 dark:fill-sc-6" />
        </div>

        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <FillIcon.Notification
            className="fill-sc-4 dark:fill-sc-6"
            notifcation
          />
        </div>

        <UserButton />

        <Theme />
      </section>
    </nav>
  );
};

export default Navbar;
