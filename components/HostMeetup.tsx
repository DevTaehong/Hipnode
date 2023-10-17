type HostMeetupType = {
  title: string;
  description: string;
  buttonOne: string;
  buttonTwo: string;
};

const HostMeetup = ({
  title,
  description,
  buttonOne,
  buttonTwo,
}: HostMeetupType) => {
  return (
    <div className="flex h-fit w-full flex-col rounded-2xl bg-host-meetup bg-cover bg-no-repeat p-5">
      <p className="semibold-18 text-white">{title}</p>
      <p className="base-12 mt-1.5 text-white">{description}</p>
      <div className="mt-5 flex w-full justify-between gap-5 md:flex-col md:gap-3 lg:flex-row lg:gap-5">
        <button className="semibold-14 w-full max-w-[8.25rem] rounded bg-red-60 py-2.5 text-red-10 md:max-w-full">
          {buttonOne}
        </button>
        <button className="semibold-14 w-full max-w-[8.25rem] rounded bg-white py-2.5 text-red-80 md:max-w-full">
          {buttonTwo}
        </button>
      </div>
    </div>
  );
};

export default HostMeetup;
