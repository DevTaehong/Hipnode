import FillIcon from "@/components/icons/fill-icons";

const GroupPostIcons = () => {
  return (
    <div className="flex flex-row gap-5">
      <FillIcon.Heart />
      <FillIcon.Comment className="fill-sc-5" />
      <FillIcon.Share className="fill-sc-5" />
    </div>
  );
};

export default GroupPostIcons;
