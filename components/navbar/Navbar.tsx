import React from "react";
import Link from "next/link";
import { HipnodeIcon, SearchIcon } from "../icons/outline-icons";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import FillIcon from "../icons/fill-icons";
import { UserButton } from "@clerk/nextjs";
import Theme from "./Theme";

const Nav = () => {
  return (
    <nav className="flex-between flex w-full bg-white px-5 py-3 dark:bg-dark-3">
      <section className="flex items-center gap-5">
        <Link href="/">
          <HipnodeIcon styles="md:hidden" />
          <HipnodeHeaderLogo styles="hidden md:flex" />
        </Link>

        <span className="cursor-pointer md:hidden">
          <SearchIcon className="stroke-sc-5 dark:stroke-sc-4" />
        </span>
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

export default Nav;
