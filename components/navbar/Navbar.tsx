import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import HipnodeHeaderLogo from "@/components/icons/HipnodeHeaderLogo";
import FillIcon from "@/components/icons/fill-icons";
import OutlineIcons from "@/components/icons/outline-icons";
import HipnodeIcon from "@/components/icons/HipnodeIcon";
import { Input } from "@/components/ui/input";
import NavLinks from "@/components/navbar/NavLinks";
import UserButton from "@/components/navbar/UserButton";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="flex-between sticky inset-x-0 top-0 z-50 flex  gap-5 bg-light px-5 py-3 dark:bg-dark-3">
      <section className="flex items-center gap-5">
        <Link href="/">
          <HipnodeIcon styles="lg:hidden" />
          <HipnodeHeaderLogo styles="hidden lg:flex" />
        </Link>

        <OutlineIcons.Search className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 lg:hidden" />
      </section>

      <NavLinks />

      <section className="hidden w-full max-w-[350px] items-center gap-2 rounded-lg bg-light-2 px-3 dark:bg-dark-4 lg:flex">
        <Input
          type="text"
          placeholder="Type here to search..."
          className="no-focus border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        />

        <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
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

        <UserButton userImg={user?.imageUrl} />
      </section>
    </nav>
  );
};

export default Navbar;
