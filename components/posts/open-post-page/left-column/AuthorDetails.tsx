import { formatDatePostFormat } from "@/utils";

interface AuthorDetailsProps {
  username: string | null;
  createdAt: Date | null;
}

const AuthorDetails = ({ username, createdAt }: AuthorDetailsProps) => {
  const formattedDate = formatDatePostFormat(createdAt || new Date());
  return (
    <aside className="mb-[1.25rem] flex min-w-[13rem] flex-col justify-start rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        <span className="pr-[0.5rem] text-[1rem] font-semibold leading-[1.5rem] text-blue-80">
          {username}
        </span>
        Posted on <span>{formattedDate}</span>
      </p>
    </aside>
  );
};

export default AuthorDetails;
