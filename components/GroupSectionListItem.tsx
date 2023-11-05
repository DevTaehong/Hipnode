import Image from "next/image";
import Link from "next/link";

const GroupSectionListItem = ({
  id,
  groupName,
  logo,
  description,
}: {
  id: number;
  groupName: string;
  logo: string;
  description: string;
}) => {
  return (
    <Link href={`/group/${id}`} className="group flex items-center gap-2">
      <Image
        src={logo}
        height={34}
        width={34}
        style={{
          objectFit: "cover",
        }}
        alt={`logo of the group ${groupName}`}
        className="h-[2.125rem] w-[2.125rem] rounded-full border border-purple-20"
      />
      <div className="flex w-full flex-col truncate">
        <h5 className="semibold-12 text-sc-2_light-2 group-hover:text-blue">
          {groupName}
        </h5>
        <p className="base-10 truncate text-sc-3">{description}</p>
      </div>
    </Link>
  );
};

export default GroupSectionListItem;
