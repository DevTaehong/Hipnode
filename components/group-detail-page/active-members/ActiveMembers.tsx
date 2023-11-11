import { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TotalMembers from "@/components/group-detail-page/active-members/TotalMembers";

const ActiveMembers = ({ members }: { members: User[] }) => {
  return (
    <div className="bg-light_dark-3 flex h-[11.5rem] w-[20.9375rem] flex-col gap-5 rounded-2xl p-5">
      <p className="semibold-16 text-sc-2 dark:text-light-2">Active Members</p>
      <div className="flex flex-row flex-wrap items-start gap-x-[1.3125rem] gap-y-5">
        {members.slice(0, 10).map((member, i) =>
          i === 9 ? (
            <TotalMembers member={member} members={members} key={member.id} />
          ) : (
            <Avatar className="h-10 w-10" key={member.id}>
              <AvatarImage
                src={member.picture}
                alt={`${member.name}'s avatar`}
              />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )
        )}
      </div>
    </div>
  );
};

export default ActiveMembers;
