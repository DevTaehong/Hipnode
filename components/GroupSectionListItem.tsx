import Image from "next/image";
import { GroupSectionGroupType } from "@/types";

const GroupSectionListItem = ({
  group: { groupName, groupDescription, icon },
}: {
  group: GroupSectionGroupType;
}) => {
  return (
    <li className="flex items-center gap-2">
      <Image
        src={icon}
        height={34}
        width={34}
        style={{
          objectFit: "cover",
        }}
        alt={`logo of the group ${groupName}`}
        className="h-[2.125rem] w-[2.125rem] rounded-full border border-purple-20"
      />
      <div className="flex w-full flex-col truncate">
        <h5 className="semibold-12 text-sc-2_light-2">{groupName}</h5>
        <p className="base-10 truncate text-sc-3">{groupDescription}</p>
      </div>
    </li>
  );
};

export default GroupSectionListItem;
