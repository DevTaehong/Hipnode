import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Theme from "@/components/navbar/Theme";

interface UserButtonProps {
  userImg: string | undefined;
}

const UserButton = async ({ userImg }: UserButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger className="shrink-0 rounded-[0.5rem] border-[1px] border-yellow">
        <Image
          src={userImg || "/christopher.png"}
          alt="User Image"
          width={30}
          height={30}
          className="m-[2px] rounded-[0.375rem] bg-yellow-30"
        />
      </PopoverTrigger>
      <PopoverContent className="relative right-[20px] top-[15px] h-[187px] w-[182px] bg-[url('/USERBUTTON_POPOVER_LIGHT.svg')] bg-center dark:bg-[url('/USERBUTTON_POPOVER_DARK.svg')]">
        <div className="flex items-center justify-between">
          <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2">
            Interface
          </p>
          <Theme />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
