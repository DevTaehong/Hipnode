"use client";

import { useEffect, useRef } from "react";

import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import OutlineIcon from "./icons/outline-icons";
import { Popover } from "./ui/popover";
import { Button } from "./ui/button";
import { ShareButtonsProps } from "@/types/podcast.index";

const ShareButtons = ({ title, shareIcons }: ShareButtonsProps) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const currentUrl = window.location.href;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="icon"
          className="rounded-full border border-sc-2 dark:border-sc-3"
        >
          <OutlineIcon.Share />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-light_dark-4 flex -translate-y-1.5 flex-col gap-5 rounded-full p-5 shadow">
          {shareIcons.map((icon) => {
            const WrapperComponent = icon.wrapper;
            const IconComponent = icon.icon;
            return (
              <WrapperComponent key={icon.name} title={title} url={currentUrl}>
                <IconComponent className="fill-dark-2 dark:fill-light-2" />
              </WrapperComponent>
            );
          })}
          <PopoverClose>
            <OutlineIcon.Close />
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButtons;
