import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OutlineIcon from "@/components/icons/outline-icons";

const Admins = () => {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex flex-row items-center justify-between" key={i}>
          <div className="flex items-center gap-2.5">
            <Avatar className="h-[1.875rem] w-[1.875rem]">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="semibold-14 font-feature text-sc-2 dark:text-light-2">
              Taehong
            </p>
          </div>
          <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full bg-blue-10">
            <OutlineIcon.Follow className="fill-blue-10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admins;
