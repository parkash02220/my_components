"use client";
import useJoinRoomSocket from "@/hooks/sockets/chat/useJoinRoomSocket";
import useMarkAllMsgAsReadSocket from "@/hooks/sockets/chat/useMarkAllMsgAsReadSocket";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
import useNewMessageSocket from "@/hooks/sockets/chat/useNewMessageSocket";
import useNewChatroomCreatedSocket from "@/hooks/sockets/chat/usePrivateChatroomCreatedSocket";

export default function useSetupChatSockets() {
  useNewMessageSocket();
  useNewChatroomCreatedSocket();

  const { joinRoom } = useJoinRoomSocket();
  const markAllMsgAsRead = useMarkAllMsgAsReadSocket();
  const { initMessages } = useGetAllMessages();

  return {
    joinRoom,
    markAllMsgAsRead,
    initMessages
  };
}
