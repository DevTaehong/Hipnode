"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import FastestGrowingGroups from "@/components/mobileGroupSection/FastestGrowingGroups";
import PopularAndNewGroups from "@/components/mobileGroupSection/PopularAndNewGroups";
import {
  fastestGrowingGroups,
  mostPopularGroups,
  newlyLaunchedGroups,
} from "@/constants";
import GroupHeader from "@/components/mobileGroupSection/GroupHeader";
import FillIcon from "@/components/icons/fill-icons";
import CollapsibleHeader from "@/components/mobileGroupSection/CollapsibleHeader";
import SeeAllGroups from "@/components/mobileGroupSection/SeeAllGroups";

const MobileGroupSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const groups = searchParams.get("groups");

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`bg-light_dark-3 rounded-2xl p-2.5 ${isOpen && "pb-3.5"}`}
    >
      {/* // NOTE - When a user click the See all button, one of the GroupHeader will be rendered. */}
      {groups === "fastest-growing" ? (
        <GroupHeader
          color="bg-yellow-10"
          icon={FillIcon.Rocket}
          title="Fastest Growing"
        />
      ) : groups === "Most Popular" ? (
        <GroupHeader
          color="bg-red-10"
          icon={FillIcon.Fire}
          title="Most Popular"
        />
      ) : groups === "Newly Launched" ? (
        <GroupHeader
          color="bg-blue-10"
          icon={FillIcon.Rocket}
          title="Newly Launched"
        />
      ) : (
        // NOTE - Default GroupHeader that can be toggled.
        <CollapsibleHeader isOpen={isOpen} />
      )}
      <CollapsibleContent>
        {/* // NOTE - When a user click the See all button, one of the SeeAllGroups will be rendered. */}
        {groups === "fastest-growing" ? (
          <SeeAllGroups allGroups={fastestGrowingGroups} />
        ) : groups === "Most Popular" ? (
          <SeeAllGroups allGroups={mostPopularGroups} />
        ) : groups === "Newly Launched" ? (
          <SeeAllGroups allGroups={newlyLaunchedGroups} />
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
