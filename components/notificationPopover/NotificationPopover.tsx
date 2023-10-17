import { dummyNotifications } from "@/constants";
import CustomButton from "../CustomButton";
import { CheckmarkIcon } from "../icons/outline-icons";
import { Separator } from "../ui/separator";
import HorizontalScrollList from "./HorizontalScrollList";
import NotificationComment from "./NotificationComment";

const NotificationPopover = () => {
  return (
    <section className="mx-10 mt-20 flex w-[500px] flex-col rounded-lg border border-black px-7 py-[1.875rem]">
      <div className="flex items-center justify-between">
        <h1 className="semibold-26 text-sc-2 dark:text-light-2">
          3 Notifications
        </h1>
        <CustomButton
          icon={CheckmarkIcon}
          label="Mark All Read"
          className="semibold-16 bg-blue-10 px-[0.625rem] py-[0.438rem] text-blue"
        />
      </div>
      <Separator className="my-[1.875rem] bg-light-2 " />
      <HorizontalScrollList />
      <Separator className="mb-5 mt-[0.688rem] bg-light-2 " />
      <div className="flex flex-col gap-[1.875rem]">
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
    </section>
  );
};

export default NotificationPopover;
