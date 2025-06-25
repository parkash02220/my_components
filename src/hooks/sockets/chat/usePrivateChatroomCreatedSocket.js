import { useChatContext } from "@/context/Chat/ChatContext";
import { useSocketContext } from "@/context/Socket/SocketContext";
import { useEffect } from "react";
import * as actions from "@/context/Chat/action";
import { convertIdFields } from "@/utils";
import { useAppContext } from "@/context/App/AppContext";
const usePrivateChatroomCreatedSocket = () => {
  const socket = useSocketContext();
  const { dispatch, state } = useChatContext();
  const activeUserId = useAppContext()?.state?.activeUser?.id || null;
  useEffect(() => {
    if (!socket) return;

    const handleNewChatroomCreate = (data) => {
      const convertedIdResponse = convertIdFields(data);
      dispatch({
        type: actions.NEW_PRIVATE_ROOM_CREATED,
        payload: { chatRoom: convertedIdResponse?.chatRoom, activeUserId },
      });
    };

    socket.on("new-chat-room", handleNewChatroomCreate);

    return () => {
      socket.off("new-chat-room", handleNewChatroomCreate);
    };
  }, [socket, dispatch]);
};

export default usePrivateChatroomCreatedSocket;
