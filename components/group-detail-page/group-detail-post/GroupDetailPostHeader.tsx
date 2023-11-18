import Tag from "@/components/profile/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heart from "@/components/icons/fill-icons/Heart";

const GroupDetailPostHeader = ({
  heading,
  author,
}: {
  heading: string;
  author: {
    id: number;
    username: string;
    picture?: string;
  };
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-2.5">
        <h3
          className={`semibold-12 lg:semibold-12 xl:semibold-18 md:semibold-18 line-clamp-3 text-sc-2 dark:text-light-2 lg:line-clamp-2`}
        >
          {heading}
        </h3>
        <div className="flex flex-row gap-2.5">
          {Array.from({ length: 3 }, (_, i) => (
            <Tag text={"Bitcoin"} key={i} />
          ))}
        </div>
      </div>
      <Avatar className="flex h-[1.875rem] w-[1.875rem] shrink-0 md:h-10 md:w-10 xl:hidden">
        <AvatarImage src={author.picture} alt={`${author.username}'s avatar`} />
        <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <Heart className={"hidden xl:block"} />
    </div>
  );
};

export default GroupDetailPostHeader;
