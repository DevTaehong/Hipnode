import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      <PopoverContent className="mt-10 bg-black">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
