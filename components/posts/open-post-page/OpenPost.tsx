import LeftActionBar from "./left-column-action-bar/LeftActionBar";
import Profile from "./right-column/Profile";
import MoreInformation from "./right-column/MoreInformation";

const OpenPost = () => (
  <>
    <LeftActionBar />
    <div className="flex flex-col gap-[1.25rem]">
      <Profile />
      <MoreInformation />
    </div>
  </>
);

export default OpenPost;
