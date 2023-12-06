import Link from "next/link";
import { Fragment } from "react";

import { Separator } from "../ui/separator";
import HorizontalScrollList from "./HorizontalScrollList";
import NotificationComment from "./NotificationComment";

import { NotificationProps } from "@/types";
import MarkAllReadButton from "./MarkAllReadButton";

const NotificationPopover = ({ notifications }: NotificationProps) => {
  const maxNotifications = 3;

  return (
    <section className="relative h-[39.375rem] w-[20.9375rem] rounded-lg bg-light pt-5 dark:bg-dark-4 xl:h-[43.8125rem] xl:w-[36.8125rem] xl:pt-[1.875rem]">
      {/* // NOTE - The pointy part of the popover */}
      <div
        className="absolute bottom-[27.11rem] left-32 h-[12.6875rem] w-[12.875rem] rounded-lg 
          bg-mobile-notification-popover bg-no-repeat dark:bg-mobile-dark-notification-popover 
          xl:bottom-[32.64rem] xl:left-0 xl:h-[11.688rem]  
          xl:w-[36.813rem] xl:bg-notification-popover dark:xl:bg-dark-notification-popover"
      />

      <div className="flex flex-col gap-5">
        {/* // NOTE - Top section */}
        <section className="relative z-10 bg-light dark:bg-dark-4">
          <div className="flex flex-col gap-5 rounded-t-lg xl:gap-[1.875rem]">
            <div className="flex items-center justify-center gap-[3.9375rem] xl:gap-[13.9375rem]">
              <h1 className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2 xl:text-[1.625rem] xl:leading-[2.375rem]">
                {notifications.length} Notifications
              </h1>
              <MarkAllReadButton />
            </div>
            <Separator className="bg-light-2 dark:bg-dark-3" />
            <div className="flex overflow-x-scroll">
              <HorizontalScrollList />
            </div>
          </div>
        </section>

        {/* // NOTE - Comments section */}
        <section className="relative z-10 flex flex-col justify-center rounded-b-lg bg-white dark:bg-dark-4">
          <div className="flex flex-col gap-5 px-5 xl:gap-[1.875rem] xl:px-[1.875rem]">
            {notifications.map((notification, index) => (
              <Fragment key={notification.userName}>
                <NotificationComment
                  userName={notification.userName}
                  type={notification.type}
                  comment={notification.comment}
                  date={notification.date}
                  title={notification.title}
                  read={notification.read}
                  image={notification.image}
                />
                {index === maxNotifications - 1 && (
                  <Link
                    href="/notifications"
                    className="semibold-14 font-feature mb-[1.625rem] inline-flex justify-center text-blue hover:underline dark:text-blue-80 xl:mb-[1.875rem]"
                  >
                    View All Notifications
                  </Link>
                )}
              </Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* NOTE - To make the blur effect */}
      <div
        className="absolute left-3 top-[4.69rem] -z-10 h-[32.3125rem] w-[19.625rem] shrink-0 bg-sc-3 opacity-50 blur-[3.125rem] 
        dark:bg-dark-1 xl:left-[1.88rem] xl:top-[6.63rem] xl:h-[35rem] xl:w-[33.375rem]"
      />
    </section>
  );
};

export default NotificationPopover;
