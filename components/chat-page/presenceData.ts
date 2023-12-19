import { usePresence } from "ably/react";
import { useMemo } from "react";

export const usePresenceData = () => {
  const { presenceData } = usePresence("hipnode-livechat");
  return presenceData;
};

type PresenceData = {
  data?: {
    id: number | string;
  };
};

export const useGetOnlineUsers = () => {
  const { presenceData } = usePresence("hipnode-livechat");

  return useMemo(() => {
    return (
      presenceData?.reduce(
        (acc: Array<number | string>, presence: PresenceData) => {
          if (presence.data?.id !== undefined) {
            acc.push(presence.data.id);
          }
          return acc;
        },
        []
      ) || []
    );
  }, [presenceData]);
};

export const useIsUserOnline = (userId: number) => {
  const { presenceData } = usePresence("hipnode-livechat");

  return useMemo(
    () =>
      presenceData?.some((presence) => presence.data?.id === userId) || false,
    [presenceData]
  );
};
