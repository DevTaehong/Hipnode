import Link from "next/link";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";

import HipnodeHeaderLogo from "@/components/icons/HipnodeHeaderLogo";
import FillIcon from "@/components/icons/fill-icons";
import OutlineIcons from "@/components/icons/outline-icons";
import HipnodeIcon from "@/components/icons/HipnodeIcon";
import { Input } from "@/components/ui/input";
import NavLinks from "@/components/navbar/NavLinks";
import UserButton from "@/components/navbar/UserButton";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import MessageListWrapper from "../live-chat/MessageListWrapper";
import NotificationButton from "./NotificationButton";

const Navbar = async () => {
  const clerkUser = await currentUser();
  let userFromDB;
  let userInfo;

  if (clerkUser) {
    userFromDB = await getUserByClerkId(clerkUser.id);
    if (userFromDB) {
      userInfo = {
        id: userFromDB.id,
        username: userFromDB.username,
        image: userFromDB.picture,
      };
    }
  }

  return (
    <nav className="flex-between sticky inset-x-0 top-0 z-50 flex gap-5 bg-light px-5 py-3 dark:bg-dark-3">
      <section className="flex items-center gap-5">
        <Link href="/">
          <HipnodeIcon styles="lg:hidden" />
          <HipnodeHeaderLogo styles="hidden lg:flex" />
        </Link>

        <OutlineIcons.Search className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 lg:hidden" />
      </section>

      <NavLinks />

      <section className="hidden w-full max-w-[350px] items-center gap-2 rounded-lg bg-light-2 px-5 py-2 dark:bg-dark-4 lg:flex">
        <Input
          type="text"
          placeholder="Type here to search..."
          className="no-focus border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        />

        <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
      </section>

      <section className="flex items-center gap-6">
        <SignedIn>
          {userFromDB && userInfo && <MessageListWrapper userInfo={userInfo} />}

          <NotificationButton />

          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-up"
            className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2"
          >
            Signup
          </Link>

          <Link
            href="/sign-in"
            className="rounded-lg bg-red-80 px-6 py-2 text-[0.875rem] font-semibold leading-[1.375rem] text-white hover:bg-red-80/80"
          >
            Login
          </Link>
        </SignedOut>
      </section>
    </nav>
  );
};

export default Navbar;
