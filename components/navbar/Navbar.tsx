import Link from "next/link";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import HipnodeHeaderLogo from "@/components/icons/HipnodeHeaderLogo";
import HipnodeIcon from "@/components/icons/HipnodeIcon";
import NavLinks from "@/components/navbar/NavLinks";
import SearchBar from "@/components/navbar/SearchBar";
import UserButton from "@/components/navbar/UserButton";
import OutlineIcons from "@/components/icons/outline-icons";

import MessageListWrapper from "../live-chat/MessageListWrapper";
import NotificationButton from "./NotificationButton";
import { verifyAuth } from "@/lib/auth";

const Navbar = async () => {
  const { userId, loggedInUserImage, userName, fullName } = await verifyAuth(
    "You must be logged in to create post."
  );

  const userInfo = {
    id: userId,
    username: userName,
    image: loggedInUserImage,
    name: fullName,
  };

  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-light dark:bg-dark-3">
      <div className="flex-between mx-auto flex max-w-[90rem] flex-1 px-5 py-3 md:py-5 lg:gap-5 lg:px-10">
        <section className="flex  items-center gap-5 lg:w-[10.75rem]">
          <Link href="/">
            <HipnodeIcon styles="lg:hidden" />
            <HipnodeHeaderLogo styles="hidden lg:flex" />
          </Link>

          <OutlineIcons.Search className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 lg:hidden" />
        </section>

        <section className="flex max-w-[49rem] flex-1 gap-5 md:justify-center lg:justify-between">
          <NavLinks />

          <SearchBar />
        </section>

        <section className="flex max-w-[17.9375rem] items-center gap-5 md:gap-[1.56rem]">
          <SignedIn>
            {userInfo && (
              <>
                {/* <MessageListWrapper userInfo={userInfo} /> */}

                <NotificationButton />

                <UserButton />
              </>
            )}
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
      </div>
    </nav>
  );
};

export default Navbar;
