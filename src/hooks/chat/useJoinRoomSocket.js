import { useEffect } from "react";
const { useSocketContext } = require("@/context/Socket/SocketContext");
import * as actions from '@/context/Chat/action';
import { useChatContext } from "@/context/Chat/ChatContext";
const useJoinRoomSocket = ({
  onRoomJoined,
  onUserTyping,
  onUserStoppedTyping
} = {}) => {
  const socket = useSocketContext();
  const {dispatch,state} = useChatContext();
  const {activeChatRoom} = state;

  const joinRoom = (roomId) => {
    if (!socket || !roomId) return;
    console.log(":::📡 Emitting joinRoom for:", roomId);
    socket.emit("joinRoom", roomId);
  };

  useEffect(() => {
    if (!socket) return;

    const handleRoomJoined = (data) => {
      console.log(":::✅ Room joined:", data);
      onRoomJoined?.(data);
    };

    const handleUserTyping = ({ userId }) => {
      console.log(":::✍️ User typing:", userId);
      onUserTyping?.(userId);
      const user = activeChatRoom?.participants?.find((user)=> user?.id === userId);
      if (user) {
        dispatch({
          type: actions.ADD_USER_IN_TYPING_USERS,
          payload: { user },
        });
      } else {
        console.warn("⚠️ Typing user not found in activeChatRoom participants", { userId, activeChatRoom });
      }
    };

    const handleUserStoppedTyping = ({ userId }) => {
      console.log(":::🛑 User stopped typing:", userId);
      onUserStoppedTyping?.(userId);
      dispatch({type:actions.REMOVE_USER_IN_TYPING_USERS,payload:{userId}})
    };

    socket.on("roomJoined", handleRoomJoined);
    socket.on("userTyping", handleUserTyping);
    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("roomJoined", handleRoomJoined);
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
    };
  }, [socket, onRoomJoined, onUserTyping, onUserStoppedTyping]);

  return { joinRoom };
};

export default useJoinRoomSocket;
