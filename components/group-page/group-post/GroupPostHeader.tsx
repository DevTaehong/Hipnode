import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupPostHeader = ({
  authorPicture,
  authorName,
  groupName,
}: {
  authorPicture: string;
  authorName: string;
  groupName: string;
}) => {
  return (
    <CardHeader className="flex flex-row items-center gap-[0.62rem]">
      <Avatar className="h-[2.125rem] w-[2.125rem]">
        <AvatarImage src={authorPicture} alt={`${authorName}'s avatar`} />
        <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="semibold-12">{groupName}</p>
        <p className="regular-10">{authorName}</p>
      </div>
    </CardHeader>
  );
};

export default GroupPostHeader;
