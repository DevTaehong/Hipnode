import { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipse } from "@/components/group-detail-page/active-members/Ellipse";

const TotalMembers = ({
  members,
  member,
}: {
  members: User[];
  member: User;
}) => (
  <div className="relative">
    <div className="semibold-12 absolute z-50 flex size-10 items-center justify-center text-light">
      {`${members.length - 9}+`}
    </div>
    <Ellipse />
    <Avatar className="size-10">
      <AvatarImage src={member.picture} alt={`${member.name}'s avatar`} />
      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
    </Avatar>
  </div>
);

export default TotalMembers;
