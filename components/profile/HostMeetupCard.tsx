import { Button } from "../ui/button";
import { HostMeetupCardProps } from "@/constants";

const HostMeetupCard = ({
  title,
  desc,
  leftBtn,
  rightBtn,
}: HostMeetupCardProps) => {
  return (
    <div className="rounded-[1rem] bg-[url('/host-meetup.png')] bg-cover bg-no-repeat p-5 text-light">
      <h3 className="text-[1.125rem] font-semibold leading-[1.625rem]">
        {title}
      </h3>

      <p className="mt-1.5 text-[0.75rem] leading-[1.125rem]">{desc}</p>

      <div className="mt-5 flex justify-center gap-5">
        <Button className="rounded-[0.375rem] bg-red-60 px-4 py-2 text-[0.875rem] font-semibold leading-[1.375rem] text-light">
          {leftBtn}
        </Button>

        <Button className="rounded-[0.375rem] bg-light px-4 py-2 text-[0.875rem] font-semibold leading-[1.375rem] text-red-80">
          {rightBtn}
        </Button>
      </div>
    </div>
  );
};

export default HostMeetupCard;
