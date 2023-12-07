import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationPopoverProps } from "@/types";
import NotificationTypeInfo from "./NotificationTypeInfo";

const NotificationComment = ({
  userName,
  title,
  date,
  read,
  comment,
  type,
  image,
}: NotificationPopoverProps) => {
  return (
    <article className="flex items-start justify-start gap-[1.875rem]">
      <div className="relative">
        <Avatar className="relative h-10 w-10 xl:h-[3.125rem] xl:w-[3.125rem]">
          <AvatarImage src={image} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className="notification_type-icon absolute left-6 top-6 flex h-[1.625rem] w-[1.625rem] items-center justify-center rounded-full bg-light 
            dark:bg-dark-3 xl:left-7 xl:top-7 xl:h-8 xl:w-8"
        >
          {NotificationTypeInfo[type].icon}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <h2
            className={`bold-16 xl:bold-18 line-clamp-1 ${
              read ? "text-sc-3 dark:text-sc-3" : "text-sc-2 dark:text-sc-3"
            }`}
          >
            {userName}{" "}
            <span className="semibold-12 xl:semibold-14">
              {NotificationTypeInfo[type].message}
            </span>
          </h2>

          {/* // NOTE - for comment type only */}
          {type === "comment" && (
            <div className="flex h-[3.125rem] items-center rounded-[0.25rem] bg-light-2 p-2.5 dark:bg-dark-3 xl:p-[0.875rem]">
              <p
                className={`regular-12 xl:regular-16 line-clamp-1 ${
                  read ? "text-sc-3 dark:text-sc-3" : "text-sc-2 dark:text-sc-3"
                }`}
              >
                &quot;{comment}&quot;
              </p>
            </div>
          )}

          <h3
            className={`semibold-14 xl:semibold-18 ${
              read ? "text-sc-3" : "text-red-80"
            } font-feature line-clamp-3`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`${
            read ? "text-sc-3" : "text-sc-2"
          } regular-10 xl:regular-14 dark:text-sc-3`}
        >
          {date}
        </p>
      </div>
    </article>
  );
};

export default NotificationComment;
