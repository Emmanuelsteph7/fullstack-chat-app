import { useEffect } from "react";
import { useSocketStore } from "../../../store/useSocketStore";

const useSocketSubscribe = () => {
  const { socketSubscriptions, unsubscribeFromSocket, socket } =
    useSocketStore();

  useEffect(() => {
    socketSubscriptions();

    return () => unsubscribeFromSocket();
  }, [socketSubscriptions, socket?.connected, unsubscribeFromSocket]);
};

export default useSocketSubscribe;
