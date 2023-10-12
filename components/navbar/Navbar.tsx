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

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-between flex w-full bg-light px-5 py-3 dark:bg-dark-3">
      <section className="flex items-center gap-5">
        <Link href="/">
          <HipnodeIcon styles="md:hidden" />
          <HipnodeHeaderLogo styles="hidden md:flex" />
        </Link>

        <SearchIcon className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 md:hidden" />
      </section>

      <section className="hidden md:flex md:items-center md:gap-5">
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

      <section className="flex items-center gap-5">
        <FillIcon.Message className="cursor-pointer fill-sc-4 dark:fill-sc-6" />

        <FillIcon.Notification
          className="cursor-pointer fill-sc-4 dark:fill-sc-6"
          notifcation
        />

        <UserButton />

        <Theme />
      </section>
    </nav>
  );
};

export default Navbar;
