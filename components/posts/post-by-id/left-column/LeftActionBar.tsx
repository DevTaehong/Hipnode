"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";

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
import { chatIcon } from "@/constants/posts";
import {
  IconBlock,
  ShareIconComponent,
  ShareIconsSection,
  ShareUrlLink,
} from ".";
import { shareIcons } from "@/constants/podcast";
import { togglePostLike } from "@/lib/actions/post.action";

const LeftActionBar = ({
  actionBarData,
  authorName,
  hasUserLiked,
  postId,
  authorId,
  postHeading,
}: LeftActionBarProps) => {
  const { toast } = useToast();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const postIdFromParams = useParams().id;
  const [like, setLike] = useState(hasUserLiked);
  const [likeCounts, setLikeCounts] = useState(actionBarData.likesCount);

  const iconData = useMemo(
    () => [
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

  const handleLike = async () => {
    setLike((prev) => !prev);
    setLikeCounts((prev) => (like ? prev - 1 : prev + 1));
    try {
      await togglePostLike(postId, authorId, postHeading);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const currentUrl = `https://hipnode-devtaehong.vercel.app/posts/post/${postIdFromParams}`;

  return (
    <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      <button
        onClick={handleLike}
        className="hover-effect flex cursor-pointer items-center gap-[0.875rem]"
      >
        <div className="flex-center size-7 rounded-md">
          <OrangeHeartIcon hasUserLiked={like} />
        </div>
        <p
          className={`text-[1rem] font-semibold leading-6 ${like ? "text-sc-1 dark:text-light" : "text-sc-3"}`}
        >
          {`${likeCounts} Heart`}
        </p>
      </button>
      {iconData.map((iconBlock, index) => (
        <IconBlock key={index} {...iconBlock} />
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hover-effect">
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
              icons={shareIcons}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
              currentUrl={currentUrl}
            />
          </div>
          <ShareUrlLink
            currentUrl={currentUrl}
            handleCopyClick={handleCopyClick}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="hover-effect">
          <IconBlock label="Report" IconComponent={ReportIcon} />
        </DialogTrigger>
        <DialogContent className="rounded-lg border-none bg-light-2 p-0 dark:bg-dark-4">
          <EmailForm
            currentUrl={currentUrl}
            setOpen={setOpen}
            authorName={authorName}
          />
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default LeftActionBar;
