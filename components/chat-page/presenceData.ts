import { usePresence } from "ably/react";
import { useMemo } from "react";

export const usePresenceData = () => {
  const { presenceData } = usePresence("hipnode-livechat");
  return presenceData;
};

export const useGetOnlineUsers = () => {
  const { presenceData } = usePresence("hipnode-livechat");

  return useMemo(
    () =>
      presenceData
        ?.map((presence) => presence.data?.id)
        .filter((id) => id !== undefined) || [],
    [presenceData]
  );
};

export const useIsUserOnline = (userId: number) => {
  const { presenceData } = usePresence("hipnode-livechat");

  return useMemo(
    () =>
      presenceData
        ?.map((presence) => presence.data?.id)
        .filter((id) => id !== undefined)
        .includes(userId) || false,
    [presenceData]
  );
};
