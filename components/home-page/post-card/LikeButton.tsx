import FillIcon from "@/components/icons/fill-icons";
import { LikeButtonProps } from "@/types/posts";

const LikeButton = ({ toggleLike, additionalClasses }: LikeButtonProps) => {
  return (
    <button type="button" onClick={toggleLike} className="mr-2.5 flex">
      <FillIcon.Heart
        className={`hidden cursor-pointer md:flex ${additionalClasses}`}
      />
    </button>
  );
};

export default LikeButton;
