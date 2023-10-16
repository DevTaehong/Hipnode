import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// NOTE - Delete this dummy data when we have real data
import { dummyMessages } from "@/constants";

const ActiveMembers = () => {
  return (
    <div className="flex w-[20.4rem] flex-col gap-5 rounded-2xl bg-white p-5 dark:bg-dark-3">
      <h1 className="semibold-16 text-sc-2 dark:text-light-2">
        Active Members
      </h1>
      <div className="flex flex-wrap gap-[1.313rem]">
        {dummyMessages.slice(0, 10).map((message) => (
          <Link
            // TODO - Change this to the real link
            href="/"
            key={message.name}
          >
            <div className="flex flex-row items-center">
              <Avatar>
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.avatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActiveMembers;
