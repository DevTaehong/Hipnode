import CustomButton from "../CustomButton";
import OutlineIcon from "../icons/outline-icons";
import { Separator } from "../ui/separator";
import HorizontalScrollList from "./HorizontalScrollList";
import NotificationComment from "./NotificationComment";

import { NotificationProps } from "@/types";

const NotificationPopover = ({ notifications }: NotificationProps) => {
  return (
    <section className="relative right-[124px] w-[335px] rounded-lg xl:right-[294px] xl:w-[589px]">
      <div className="flex h-[203px] w-[335px] flex-col items-start justify-between rounded-lg bg-[url('/navbar/notification_bg_mobile_light.svg')] bg-center dark:bg-[url('/navbar/notification_bg_mobile_dark.svg')] xl:h-[187px] xl:w-[589px] xl:bg-[url('/navbar/notification_bg_light.svg')] dark:xl:bg-[url('/navbar/notification_bg_dark.svg')]">
        <section className="mt-11 flex w-full items-center justify-between px-8">
          <h1 className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2 xl:text-[1.625rem] xl:leading-[2.375rem]">
            {notifications.length} Notifications
          </h1>

          <CustomButton
            icon={OutlineIcon.Checkmark}
            label="Mark All Read"
            className="semibold-16 rounded-lg bg-blue-10 px-[0.625rem] py-[0.438rem] text-blue dark:bg-dark-3"
          />
        </section>
      </div>

      <div className="relative top-[-125px] rounded-b-lg bg-white dark:bg-dark-4 xl:top-[-100px]">
        <Separator className="seperator-light2-dark3 my-[1.875rem]" />

        <HorizontalScrollList />

        <Separator className="seperator-light2-dark3 mb-5" />

        <div className="flex flex-col gap-[1.875rem] px-4 pb-4">
          {notifications.map((notification) => (
            <NotificationComment
              key={notification.name}
              name={notification.name}
              type={notification.type}
              comment={notification.comment}
              date={notification.date}
              title={notification.title}
              read={notification.read}
              image={notification.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotificationPopover;
