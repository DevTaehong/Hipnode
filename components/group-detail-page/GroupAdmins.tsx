import Admins from "@/components/group-detail-page/Admins";

const GroupAdmins = ({
  admins,
}: {
  admins: { picture: string; username: string; id: number }[];
}) => {
  return (
    <div className="bg-light_dark-3 flex flex-col gap-5 rounded-2xl p-2.5 text-sc-2 dark:text-light-2 lg:p-5">
      <p className="semibold-16">Admins</p>
      <Admins admins={admins} />
    </div>
  );
};

export default GroupAdmins;
