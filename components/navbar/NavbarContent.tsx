"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import UserButton from "./UserButton";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import HipnodeIcon from "../icons/HipnodeIcon";
import MessageListWrapper from "../live-chat/MessageListWrapper";
import GlobalSearchBar from "./GlobalSearchBar";
import OutlineIcon from "../icons/outline-icons";
import NavLinks from "./NavLinks";
import NotificationButton from "./NotificationButton";
import { NavbarContentProps } from "@/types/searchbar.index";
import { reducer, initialState } from "./globalSearchReducer";

const NavbarContent = ({
  userInfo,
  currentUserId,
  lastChecked,
}: NavbarContentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenClose = () => {
    if (state.showSearch) {
      dispatch({ type: "HANDLE_CLOSE" });
    } else {
      dispatch({ type: "HANDLE_OPEN" });
    }
  };

  return (
    <>
      <div className="flex-between mx-auto flex max-w-[90rem] flex-1 px-5 py-3 md:py-5 lg:gap-5 lg:px-10">
        <section className="flex  items-center gap-5 lg:w-[10.75rem]">
          <Link href="/">
            <HipnodeIcon styles="lg:hidden" />
            <HipnodeHeaderLogo styles="hidden lg:flex" />
          </Link>
          <div className="flex" onClick={handleOpenClose}>
            <OutlineIcon.Search className="cursor-pointer stroke-sc-5 lg:hidden dark:stroke-sc-4" />
          </div>
        </section>

        <section className="relative flex max-w-[49rem] flex-1 gap-5 md:justify-center lg:justify-between">
          <NavLinks />
          <GlobalSearchBar
            additionalStyles={`${
              state.showSearch
                ? "flex fixed left-4 right-4 lg:left-0 lg:right-0 lg:w-full z-20 top-5 lg:top-0"
                : "hidden lg:flex"
            }`}
            state={state}
            dispatch={dispatch}
          />
        </section>

        <section className="flex max-w-[17.9375rem] items-center gap-5 md:gap-[1.56rem]">
          <SignedIn>
            <MessageListWrapper userInfo={userInfo} />
            <NotificationButton
              currentUserId={currentUserId}
              lastChecked={lastChecked ?? new Date()}
            />
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
      </div>
      {(state.showSearch || state.showSearchBar) && (
        <div className="fixed inset-0 z-10" onClick={handleOpenClose} />
      )}
    </>
  );
};

export default NavbarContent;
