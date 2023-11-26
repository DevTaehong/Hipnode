import { dummyNotifications } from "@/constants";
import CustomButton from "../CustomButton";
import OutlineIcon from "../icons/outline-icons";
import { Separator } from "../ui/separator";
import HorizontalScrollList from "./HorizontalScrollList";
import NotificationComment from "./NotificationComment";

const NotificationPopover = () => {
  return (
    <section className="relative right-[294px] w-[589px]">
      <div className="flex h-[187px] w-[589px] flex-col items-start justify-between bg-[url('/navbar/notification_bg_light.svg')] bg-center  dark:bg-[url('/navbar/notification_bg_dark.svg')]">
        <section className="mt-11 flex w-full items-center justify-between px-8">
          <h1 className="text-[1.625rem] font-semibold leading-[2.375rem] text-sc-2 dark:text-light-2">
            3 Notifications
          </h1>

          <CustomButton
            icon={OutlineIcon.Checkmark}
            label="Mark All Read"
            className="semibold-16 rounded-lg bg-blue-10 px-[0.625rem] py-[0.438rem] text-blue dark:bg-dark-3"
          />
        </section>
      </div>

      <div className="relative top-[-100px] rounded-b-lg bg-white dark:bg-[#2C353D]">
        <Separator className="my-[1.875rem] bg-light-2 dark:bg-dark-3" />

        <HorizontalScrollList />

        <Separator className="mb-5 bg-light-2 dark:bg-dark-3" />

        <div className="flex flex-col gap-[1.875rem] px-4 pb-4">
          {dummyNotifications.map((notification) => (
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
