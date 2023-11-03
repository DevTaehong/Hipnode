"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import FillIcon from "@/components/icons/fill-icons";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <section className="hidden lg:flex lg:items-center lg:gap-5">
      {navLinks.map(({ name, link }) => {
        const Icon = FillIcon[name as keyof typeof FillIcon];

        const isActive = pathname === link;

        return (
          <Link
            href={link}
            key={name}
            className={cn(
              "cursor-pointer rounded-lg p-2",
              isActive && "bg-red"
            )}
          >
            <Icon
              className={cn(
                isActive ? "fill-light" : "fill-sc-5 dark:fill-sc-6"
              )}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default NavLinks;
