import { verifyAuth } from "@/lib/auth";
import { getNotificationLastChecked } from "@/lib/actions/user.actions";
import { NavbarContent } from ".";

const Navbar = async () => {
  const { userId, loggedInUserImage, userName, fullName } = await verifyAuth(
    "You must be logged in to view this page.",
    false
  );
  let lastChecked;
  if (userId) {
    lastChecked = await getNotificationLastChecked(userId);
  }

  const userInfo = {
    id: userId,
    username: userName,
    image: loggedInUserImage,
    name: fullName,
  };

  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-light dark:bg-dark-3">
      <NavbarContent
        userInfo={userInfo}
        currentUserId={userId}
        lastChecked={lastChecked?.notificationLastChecked}
      />
    </nav>
  );
};

export default Navbar;
