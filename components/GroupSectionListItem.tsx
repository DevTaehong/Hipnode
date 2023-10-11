import Image, { StaticImageData } from "next/image";

interface GroupSectionListItemProps {
  group: {
    icon: string | StaticImageData;
    groupDescription: string;
    groupName: string;
  };
}

const GroupSectionListItem = ({ group }: GroupSectionListItemProps) => {
  const { groupName, groupDescription, icon } = group;
  return (
    <li className="flex items-center gap-2">
      <Image
        src={icon}
        height={34}
        width={34}
        style={{
          objectFit: "cover",
        }}
        alt="logo of the group"
        className="h-[2.125rem] w-[2.125rem] rounded-full border border-purple-20"
      />
      <div className="flex w-full flex-col truncate">
        <h5 className="semibold-12 text-sc-2_light-2">{groupName}</h5>
        <h5 className="base-10 truncate text-sc-3">{groupDescription}</h5>
      </div>
    </li>
  );
};

export default GroupSectionListItem;
