
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, userId }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket"],
    });

    socket.emit("register", userId);
    socketRef.current = socket;


    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socketRef = useContext(SocketContext);
  if (!socketRef || !socketRef.current) {
    return null;
  }
  return socketRef.current;
};
