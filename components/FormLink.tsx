type FormLinkType = {
  title: string;
  description: string;
  buttonOne: string;
  buttonTwo: string;
};

const FormLink = ({
  title,
  description,
  buttonOne,
  buttonTwo,
}: FormLinkType) => {
  return (
    <div className="flex h-fit w-full flex-col rounded-2xl bg-host-meetup bg-cover bg-no-repeat p-5 lg:w-[20.3125rem]">
      <p className="semibold-18 text-white">{title}</p>
      <p className="base-12 mt-1.5 text-white">{description}</p>
      <div className="mt-5 flex w-full justify-between gap-5">
        <button className="semibold-14 w-full rounded bg-red-60 py-2.5 text-red-10">
          {buttonOne}
        </button>
        <button className="semibold-14 w-full rounded bg-white py-2.5 text-red-80">
          {buttonTwo}
        </button>
      </div>
    </div>
  );
};

export default FormLink;
