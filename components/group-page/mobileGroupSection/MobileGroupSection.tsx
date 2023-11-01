"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import FastestGrowingGroups from "@/components/group-page/mobileGroupSection/FastestGrowingGroups";
import PopularAndNewGroups from "@/components/group-page/mobileGroupSection/PopularAndNewGroups";
import GroupHeader from "@/components/group-page/mobileGroupSection/GroupHeader";
import CollapsibleHeader from "@/components/group-page/mobileGroupSection/CollapsibleHeader";
import SeeAllGroups from "@/components/group-page/mobileGroupSection/SeeAllGroups";
import { groupData } from "@/constants";
import { GroupData } from "@/types";

const MobileGroupSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const groups = searchParams.get("groups") ?? "N/A";
  const selectedGroup = groupData[groups as keyof GroupData];

  return (
    <section className="block p-5 lg:hidden">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`bg-light_dark-3 rounded-2xl p-2.5 ${isOpen && "pb-3.5"}`}
      >
        {/* // NOTE - When a user click the See all button, the GroupHeader will be rendered. */}
        {selectedGroup ? (
          <GroupHeader
            color={selectedGroup.header.color}
            Icon={selectedGroup.header.icon}
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
    </section>
  );
};

export default MobileGroupSection;
