import Admins from "@/components/group-detail-page/Admins";
import { admins } from "@/constants";

const GroupAdmins = () => {
  return (
    <div className="bg-light_dark-3 flex flex-col gap-5 rounded-2xl p-2.5 text-sc-2 dark:text-light-2">
      <p className="semibold-16">Admins</p>
      <Admins adminsList={admins} />
    </div>
  );
};

export default GroupAdmins;
