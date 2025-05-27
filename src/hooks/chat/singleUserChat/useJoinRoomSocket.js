import { useEffect } from "react";
const { useSocketContext } = require("@/context/Socket/SocketContext");

const useJoinRoomSocket = ({
  onRoomJoined,
  onUserTyping,
  onUserStoppedTyping
} = {}) => {
  const socket = useSocketContext();

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
      console.log("✍️ User typing:", userId);
      onUserTyping?.(userId);
    };

    const handleUserStoppedTyping = ({ userId }) => {
      console.log(":::🛑 User stopped typing:", userId);
      onUserStoppedTyping?.(userId);
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
