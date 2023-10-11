import React from "react";
import Link from "next/link";
import { HipnodeIcon } from "../icons/outline-icons";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";

const Nav = () => {
  return (
    <nav className="">
      <section>
        <Link href="/">
          <HipnodeIcon styles="md:hidden" />
          <HipnodeHeaderLogo styles="hidden md:flex" />
        </Link>
      </section>

      {/* Links to different parts that shows on lg screen */}
      <section></section>
    </nav>
  );
};

export default Nav;
