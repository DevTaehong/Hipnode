"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

import { useToast } from "@/components/ui/use-toast";
import {
  OrangeHeartIcon,
  CommentIcon,
  ShareIcon,
  ReportIcon,
} from "@/components/icons/open-post-icons/PostIcons";
import { LeftActionBarProps } from "@/types/posts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import EmailForm from "@/components/email/EmailForm";

import {
  IconBlock,
  ShareIconComponent,
  ShareIconsSection,
  ShareUrlLink,
} from ".";
import { shareIcons } from "@/constants/podcast";
import { chatIcon, moreIcon } from "@/constants/posts";

const LeftActionBar = ({ actionBarData, author }: LeftActionBarProps) => {
  const { toast } = useToast();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [showMoreIcons, setShowMoreIcons] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

  const iconsToDisplay = showMoreIcons ? shareIcons : shareIcons.slice(0, 4);

  return (
    <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {iconData.map((iconBlock, index) => (
        <IconBlock key={index} {...iconBlock} />
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <IconBlock
            label="Share"
            count={actionBarData.sharesCount}
            IconComponent={ShareIcon}
          />
        </DialogTrigger>
        <DialogContent className="bg-light_dark-3 flex w-full max-w-[34.5rem] flex-col gap-11 rounded-2xl border-0 p-8">
          <div className="flex w-full justify-between">
            <p className="semibold-18 text-sc-2_light-2">Share with</p>
            <DialogClose className="text-sc-2_light-2 text-2xl">
              <IoClose />
            </DialogClose>
          </div>
          <div className="flex w-full flex-wrap justify-evenly gap-4">
            <Link href="/chat">
              <ShareIconComponent
                icon={chatIcon}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
            </Link>
            <ShareIconsSection
              icons={iconsToDisplay}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
              currentUrl={currentUrl}
            />
            <div
              className="flex"
              onClick={() => setShowMoreIcons((prev) => !prev)}
            >
              <ShareIconComponent
                icon={moreIcon}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
            </div>
          </div>
          <ShareUrlLink
            currentUrl={currentUrl}
            handleCopyClick={handleCopyClick}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <IconBlock label="Report" IconComponent={ReportIcon} />
        </DialogTrigger>
        <DialogContent className="rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <EmailForm
            currentUrl={currentUrl}
            setOpen={setOpen}
            author={author}
          />
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default LeftActionBar;
