import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessagesPopover = () => {
  return (
    <div className="relative">
      <div className="relative z-10 flex h-[26.125rem] w-[21rem] flex-col gap-5 bg-light p-5">
        <div>Messages</div>
        <div className="flex flex-row">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p>
              Wade Warren <span>20 minutes ago</span>
            </p>
            <p>Congrats on your work anniversary!</p>
          </div>
          <div className="flex h-[1.125rem] w-[1.125rem] items-center justify-center gap-[0.625rem] rounded-[0.875rem] bg-red-80 p-1">
            2
          </div>
        </div>
      </div>
      <div className="absolute left-[1.44rem] top-[3.19rem] h-[22.9375rem] w-[18rem] shrink-0 bg-sc-3 opacity-50 blur-[3.125rem]" />
    </div>
  );
};

export default MessagesPopover;
