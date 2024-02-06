"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import FillIcon from "@/components/icons/fill-icons";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <section className="fixed inset-x-0 bottom-0 flex h-[68px] items-center justify-center gap-5 bg-light dark:bg-dark-3 md:relative md:h-auto">
        {navLinks.map(({ name, link }) => {
          const Icon = FillIcon[name as keyof typeof FillIcon];

          const isActive = pathname === link;

          return (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Link
                  href={link}
                  className={cn(
                    "cursor-pointer rounded-lg p-2 transition-colors hover:bg-red dark:hover:bg-red group",
                    isActive && "bg-red"
                  )}
                >
                  <Icon
                    className={cn(
                      isActive ? "fill-light" : "fill-sc-5 dark:fill-sc-6",
                      "group-hover:fill-light"
                    )}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-dark-3 text-light-2 opacity-80">
                {name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </section>
    </TooltipProvider>
  );
};

export default NavLinks;
