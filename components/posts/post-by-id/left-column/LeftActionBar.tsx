"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import {
  InstapaperShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
} from "react-share";

import { useToast } from "@/components/ui/use-toast";
import {
  OrangeHeartIcon,
  CommentIcon,
  ShareIcon,
  ReportIcon,
} from "@/components/icons/open-post-icons/PostIcons";
import { IconBlockProps, LeftActionBarProps } from "@/types/posts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import OutlineIcon from "@/components/icons/outline-icons";
import EmailForm from "@/components/email/EmailForm";

const shareIcons = [
  {
    wrapper: InstapaperShareButton,
    label: "Chat",
    icon: OutlineIcon.Comment,
  },
  {
    wrapper: InstapaperShareButton,
    label: "Instagram",
    icon: OutlineIcon.Instagram,
  },
  {
    wrapper: TwitterShareButton,
    label: "Twitter",
    icon: OutlineIcon.Twitter,
  },
  {
    wrapper: LinkedinShareButton,
    label: "LinkedIn",
    icon: OutlineIcon.LinkedIn,
  },
  {
    wrapper: EmailShareButton,
    label: "Email",
    icon: OutlineIcon.Mention,
  },
  {
    wrapper: InstapaperShareButton,
    label: "More",
    icon: OutlineIcon.Share2,
  },
];

const LeftActionBar = ({ actionBarData }: LeftActionBarProps) => {
  const { toast } = useToast();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [showMoreIcons, setShowMoreIcons] = useState<boolean>(false);
  const iconData = useMemo(
    () => [
      {
        label: "Heart",
        count: actionBarData.likesCount,
        IconComponent: OrangeHeartIcon,
      },
      {
        label: "Comments",
        count: actionBarData.commentsCount,
        IconComponent: CommentIcon,
      },
    ],
    [actionBarData]
  );

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard.",
      variant: "formFieldsFill",
    });
  };

  const currentUrl = window.location.href;

  return (
    <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {iconData.map((iconBlock, index) => (
        <IconBlock key={index} {...iconBlock} />
      ))}
      <Dialog>
        <DialogTrigger>
          <IconBlock
            label="Share"
            count={actionBarData.sharesCount}
            IconComponent={ShareIcon}
          />
        </DialogTrigger>
        <DialogContent className="bg-light_dark-3 flex max-w-[33.5rem] flex-col gap-11 rounded-2xl border-0 p-8">
          <div className="flex w-full justify-between">
            <p className="semibold-18 text-sc-2_light-2">Share with</p>
            <DialogClose className="text-sc-2_light-2 text-2xl">
              <IoClose />
            </DialogClose>
          </div>
          <div className="flex w-full justify-evenly gap-4">
            {shareIcons.map((icon) => {
              const IconComponent = icon.icon;
              const isIconHoveredOver = hoveredIcon === icon.label;

              const hoveredStyle =
                icon.label === "Chat" ? "stroke-red" : "fill-red";
              const unhoveredStyle =
                icon.label === "Chat"
                  ? "stroke-sc-2 dark:stroke-light-2"
                  : "fill-sc-2 dark:fill-light-2";

              const IconContent = () => {
                return (
                  <div
                    className="flex cursor-pointer flex-col items-center gap-2"
                    onMouseOver={() => setHoveredIcon(icon.label)}
                    onMouseLeave={() => setHoveredIcon("")}
                  >
                    <div
                      className={`${
                        isIconHoveredOver ? "bg-red-10" : "bg-light-2_dark-4"
                      } flex-center  h-[4.25rem] w-[4.25rem] shrink-0 rounded-full`}
                    >
                      <IconComponent
                        className={`${
                          isIconHoveredOver ? hoveredStyle : unhoveredStyle
                        }`}
                      />
                    </div>
                    <p
                      className={`semibold-14 ${
                        isIconHoveredOver
                          ? "text-red dark:text-red"
                          : "text-sc-4"
                      }  dark:text-sc-5`}
                    >
                      {icon.label}
                    </p>
                  </div>
                );
              };

              if (icon.label === "Chat") {
                return (
                  <Link key={icon.label} href="/chat" onClick={handleCopyClick}>
                    <IconContent />
                  </Link>
                );
              } else if (icon.label === "More") {
                <div
                  className="flex"
                  onClick={() => setShowMoreIcons((prev) => !prev)}
                >
                  <IconContent />
                </div>;
              } else {
                const ShareWrapper = icon.wrapper;
                return (
                  <ShareWrapper
                    key={icon.label}
                    title={icon.label}
                    url={currentUrl}
                  >
                    <IconContent />
                  </ShareWrapper>
                );
              }
            })}
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="semibold-12 text-sc-3 dark:text-sc-4">
              Or share with link
            </p>
            <div className="bg-light-2_dark-4 flex h-[3.3125rem] w-full items-center justify-between gap-7 rounded-2xl px-4">
              <p className="semibold-14 line-clamp-1 text-sc-4 dark:text-sc-5">
                {currentUrl}
              </p>
              <div className="flex cursor-pointer" onClick={handleCopyClick}>
                <OutlineIcon.Copy />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <IconBlock label="Report" IconComponent={ReportIcon} />
        </DialogTrigger>
        <DialogContent className="rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <EmailForm />
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default LeftActionBar;

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex items-center gap-[0.875rem]">
    <div className="flex-center h-[1.75rem] w-[1.75rem] rounded-md">
      <IconComponent />
    </div>
    {count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3 dark:text-sc-3">
        {`${count}`} {label}
      </p>
    )}
    {!count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        {label}
      </p>
    )}
  </div>
);
