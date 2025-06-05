import { useSocketContext } from "@/context/Socket/SocketContext";
import useToast from "../../common/useToast";
import { useEffect } from "react";
import { useChatContext } from "@/context/Chat/ChatContext";
import * as actions from '@/context/Chat/action';
import { convertIdFields } from "@/utils";
import { useAppContext } from "@/context/App/AppContext";
const useNewMessageSocket = () => {
    const socket = useSocketContext();
    const {dispatch} = useChatContext();
    const { showToast } = useToast();
    const {activeUser} = useAppContext().state;
    const toastId = "new_message";
    useEffect(() => {
      if (!socket) return;
      const handleNewMessage = (data) => {
        const convertedData = convertIdFields(data || {});
    //     showToast({ toastId, type: "info", message: data?.message || "" });
    dispatch({
      type: actions.UPDATE_LAST_MESSAGE,
      payload: {
        message: convertedData?.message,
        activeUserId: activeUser?.id,
        chatRoomId: convertedData?.chatRoomId,
      },
    });
        dispatch({
          type: actions.ADD_NEW_MESSAGE_IN_CHAT,
          payload: { newMessageData: convertedData,activeUser },
        });
      };
  
      socket.on("new-message", handleNewMessage);
      return () => {
        socket.off("new-message", handleNewMessage);
      };
    }, [socket]);
}
export default useNewMessageSocket;