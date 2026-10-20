import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

// Live subscription, not a one-time check — see docs/03-api-and-data/offline-sync.md.
// `isConnected` starts `true` optimistically; NetInfo reports the real value almost
// immediately after mount, before the trainer could plausibly submit a form.
export function useConnectivity(): boolean {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(Boolean(state.isConnected));
    });
    return unsubscribe;
  }, []);

  return isConnected;
}
