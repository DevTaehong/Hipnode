import { Group } from "@/types";
import { ArrowIcon } from "./icons/outline-icons";
import { christopher } from "@/public/assets";
import Image from "next/image";

const PinnedGroup = ({ groups }: { groups: Group[] }) => {
  return (
    <section className="bg-light_dark-3 flex w-full flex-col gap-5 rounded-2xl p-5">
      <header className="flex items-center gap-1">
        <h2 className="text-sc-2_light-2 semibold-16">Pinned Group</h2>
        <ArrowIcon.Right className="stroke-sc-2 dark:stroke-light-2" />
      </header>

      <ul className="flex flex-col gap-2.5">
        {groups.map((group) => (
          <li key={group.id} className="flex items-center gap-2.5">
            <Image
              src={christopher}
              alt="Logo of group in list of pinned groups"
              height={32}
              width={32}
              className="rounded"
            />

            <article className="flex flex-col">
              <h3 className="semibold-12 text-sc-4_light-2">
                {group.groupName}
              </h3>
              <p className="base-9 text-sc-4 dark:text-sc-3">{group.details}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PinnedGroup;
