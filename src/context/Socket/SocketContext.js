
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as actions from '@/context/Chat/action';
import { useChatContext } from "../Chat/ChatContext";
const SocketContext = createContext(null);

export const SocketProvider = ({ children, userId }) => {
  const socketRef = useRef(null);
  const {dispatch} = useChatContext();
  useEffect(() => {
    if (!userId) return;

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket"],
    });

    socket.emit("register", userId);
    socketRef.current = socket;

    socket.on("online-users", (users) => {
      dispatch({type:actions.SET_ONLINE_USERS,payload:users});
      
    });


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

export const useSocketContext = () => {
  const socketRef = useContext(SocketContext);
  if (!socketRef || !socketRef.current) {
    return null;
  }
  return socketRef.current;
};
