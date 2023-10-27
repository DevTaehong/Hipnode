"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import FastestGrowingGroups from "@/components/mobileGroupSection/FastestGrowingGroups";
import PopularAndNewGroups from "@/components/mobileGroupSection/PopularAndNewGroups";
import GroupHeader from "@/components/mobileGroupSection/GroupHeader";
import CollapsibleHeader from "@/components/mobileGroupSection/CollapsibleHeader";
import SeeAllGroups from "@/components/mobileGroupSection/SeeAllGroups";
import { groupData } from "@/constants";
import { GroupData } from "@/types";

const MobileGroupSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const groups = searchParams.get("groups") as string;
  const selectedGroup = groupData[groups as keyof GroupData];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`bg-light_dark-3 rounded-2xl p-2.5 ${isOpen && "pb-3.5"}`}
    >
      {/* // NOTE - When a user click the See all button, the GroupHeader will be rendered. */}
      {selectedGroup ? (
        <GroupHeader
          color={selectedGroup.header.color}
          icon={selectedGroup.header.icon}
          title={selectedGroup.header.title}
        />
      ) : (
        // NOTE - Default GroupHeader that can be toggled.
        <CollapsibleHeader isOpen={isOpen} />
      )}
      <CollapsibleContent>
        {/* // NOTE - When a user click the See all button, the SeeAllGroups will be rendered. */}
        {selectedGroup ? (
          <SeeAllGroups allGroups={selectedGroup.groups} />
        ) : (
          <>
            {/* // NOTE - Default three groups showing */}
            <FastestGrowingGroups />
            <PopularAndNewGroups />
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileGroupSection;
