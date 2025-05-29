// useMarkAsReadMsgSocket.js
import { useAppContext } from "@/context/App/AppContext";
import { useChatContext } from "@/context/Chat/ChatContext";
import { useSocketContext } from "@/context/Socket/SocketContext";
import { useEffect } from "react";
import * as actions from '@/context/Chat/action';
const useMarkAllMsgAsReadSocket = () => {
  const socket = useSocketContext();
  const {activeUser} = useAppContext().state;
  const {dispatch} = useChatContext();
  const markAllMsgAsRead = (chatId) => {
    const readerId = activeUser?.id
    if (!chatId || !readerId) return;

    socket.emit("mark-chat-as-read", {
      chatId,
      readerId,
    });

    dispatch({type:actions.MARK_CHAT_AS_READ,payload:{chatId,readerId}})
  };

  useEffect(() => {
    if (!socket) return;
    const handleAllMsgRead = (data) => {
      console.log(":::data in read socket",data);
      // const convertedData = convertIdFields(data || {});
  //     showToast({ toastId, type: "info", message: data?.message || "" });
      // dispatch({
      //   type: actions.ADD_NEW_MESSAGE_IN_CHAT,
      //   payload: { newMessageData: convertedData },
      // });
    };

    socket.on("chat-read-update", handleAllMsgRead);
    return () => {
      socket.off("chat-read-update", handleAllMsgRead);
    };
  }, [socket]);

  return markAllMsgAsRead;
};

export default useMarkAllMsgAsReadSocket;
