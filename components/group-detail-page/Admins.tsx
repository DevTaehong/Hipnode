import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OutlineIcon from "@/components/icons/outline-icons";

const Admins = ({
  admins,
}: {
  admins: { picture: string; username: string; id: number }[];
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      {admins.map((admin) => (
        <div
          className="flex flex-row items-center justify-between"
          key={admin.username}
        >
          <Link
            href={`/profile/${admin.id}`}
            className="flex items-center gap-2.5 hover:opacity-80 hover:transition-opacity"
          >
            <Avatar className="h-[1.875rem] w-[1.875rem]">
              <AvatarImage src={admin.picture} alt={admin.username} />
              <AvatarFallback>{admin.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="semibold-14 font-feature text-sc-2 dark:text-light-2">
              {admin.username}
            </p>
          </Link>
          <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full bg-blue-10">
            {/* // TODO - add follow functionality */}
            <OutlineIcon.Follow className="fill-blue-10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admins;
