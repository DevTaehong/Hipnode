import { Avatar, AvatarImage } from "../ui/avatar";
import { NotificationPopoverProps } from "@/types";
import MentionIcon from "../icons/outline-icons/MentionIcon";
import CommentIcon from "../icons/outline-icons/CommentIcon";
import { HeartIcon } from "../icons/outline-icons";

const NotificationComment = ({
  name,
  title,
  date,
  read,
  comment,
  type,
  image,
}: NotificationPopoverProps) => {
  const typeText = (type: string) => {
    switch (type) {
      case "comment":
        return "commented on your post";
      case "reaction":
        return "loved your post";
      case "mention":
        return "mentioned you";
      default:
        return "";
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <CommentIcon />;
      case "reaction":
        return <HeartIcon />;
      case "mention":
        return <MentionIcon />;
      default:
        return "";
    }
  };
  return (
    <article className="flex items-start justify-start gap-5">
      <div className="relative flex">
        <Avatar className="h-[3.125rem] w-[3.125rem]">
          <AvatarImage src={image} />
        </Avatar>
        <div className="absolute left-7 right-0 top-1/2 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-light dark:bg-dark-3">
          {typeIcon(type)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h1 className={`bold-18 ${read ? "text-sc-3" : "text-sc-2"}`}>
          {name} <span className="semibold-14">{typeText(type)}</span>
        </h1>
        {type === "comment" && (
          <div className="rounded-[0.25rem] bg-light-2 p-3 dark:bg-dark-3">
            <p className="regular-16 text-sc-2 dark:text-sc-3">
              &quot;{comment}&quot;
            </p>
          </div>
        )}
        <h2 className={`semibold-18 ${read ? "text-sc-3" : "text-red-80"}`}>
          {title}
        </h2>
        <p className="regular-14 text-sc-3">{date}</p>
      </div>
    </article>
  );
};

export default NotificationComment;
