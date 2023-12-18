import Link from "next/link";
import FillIcon from "@/components/icons/fill-icons";

const UserButtonLink = ({ link, text }: { link: string; text: string }) => {
  const Icon = FillIcon[text as keyof typeof FillIcon];

  return (
    <Link
      key={text}
      href={link}
      className="flex items-center gap-3.5 rounded text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2"
    >
      <Icon className="fill-sc-2 dark:fill-light-2" />
      {text}
    </Link>
  );
};

export default UserButtonLink;
