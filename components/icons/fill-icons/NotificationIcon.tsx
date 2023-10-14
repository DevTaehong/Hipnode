export default function NotificationIcon({
  notifcation,
}: {
  notifcation?: boolean;
}) {
  return (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3326 13.0613H17.9129C19.0691 13.0613 20 13.9747 20 15.1015V15.511C20 15.9648 19.6268 16.3266 19.1662 16.3266H0.833903C0.372933 16.3266 3.05176e-05 15.9613 3.05176e-05 15.511V15.1015C3.05176e-05 13.9752 0.9345 13.0613 2.0872 13.0613H1.66751C2.12557 13.0613 2.49997 12.6955 2.49997 12.2442V7.34691C2.49997 3.28752 5.85785 0 10.0001 0C14.1434 0 17.5003 3.28927 17.5003 7.34691V12.2442C17.5003 12.6983 17.8729 13.0613 18.3328 13.0613H18.3326ZM7.08305 17.1429H12.9164C12.9164 18.7208 11.6105 20 9.9997 20C8.38895 20 7.08305 18.7208 7.08305 17.1429Z"
      />
      {notifcation && (
        <circle cx="16.5" cy="3.5" r="3" fill="#FF6934" stroke="#F4F6F8" />
      )}
    </>
  );
}
