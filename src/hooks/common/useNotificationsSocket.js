import { useAppContext } from "@/context/AppContext";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const useNotificationsSocket = () => {
  const {state} = useAppContext();
  const {activeUser} = state;
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!activeUser?.id) return;

    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    socketRef.current.emit("register", activeUser?.id);

    socketRef.current.on("notification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [activeUser?.id]);

  return {
    notifications,
  };
};
