import NotificationPopover from "./NotificationPopover";

const NotificationButton = ({
  currentUserId,
  lastChecked,
}: {
  currentUserId: number;
  lastChecked: Date;
}) => {
  return (
    <>
      {/* // NOTE - Because of different offsets on mobile and desktop, we need to render two different */}
      <NotificationPopover
        className="block xl:hidden"
        sideOffset={15}
        alignOffset={-72}
        currentUserId={currentUserId}
        lastChecked={lastChecked}
      />
      <NotificationPopover
        className="hidden xl:block"
        sideOffset={11}
        alignOffset={-189}
        currentUserId={currentUserId}
        lastChecked={lastChecked}
      />
    </>
  );
};

export default NotificationButton;
