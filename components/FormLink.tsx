import { cn } from "@/lib/utils";
import Link from "next/link";

type FormLinkButtonType = {
  title: string;
  link: string;
};

type FormLinkType = {
  title: string;
  description: string;
  codeOfConductButton: FormLinkButtonType;
  linkToFormButton: FormLinkButtonType;
  className?: string;
};

const FormLink = ({
  title,
  description,
  codeOfConductButton,
  linkToFormButton,
  className,
}: FormLinkType) => {
  const buttons = [codeOfConductButton, linkToFormButton];
  const buttonStyles = ["bg-red-60 text-red-10", "bg-white text-red-80"];

  return (
    <div
      className={`${className} h-fit w-full flex-col rounded-2xl bg-host-meetup bg-cover bg-no-repeat p-5 lg:max-w-[20.3125rem]`}
    >
      <p className="semibold-18 text-white">{title}</p>
      <p className="base-12 mt-1.5 text-white">{description}</p>
      <div className="mt-5 flex w-full justify-between gap-5">
        {buttons.map((button, index) => (
          <Link
            href={button.link}
            key={button.title}
            className={cn(
              "semibold-14 flex-center w-full rounded py-2.5",
              buttonStyles[index]
            )}
          >
            {button.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FormLink;
