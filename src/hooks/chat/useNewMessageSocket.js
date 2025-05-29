import { useSocketContext } from "@/context/Socket/SocketContext";
import useToast from "../common/useToast";
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
   console.log(":::entering message socket",socket)
    useEffect(() => {
      if (!socket) return;
      const handleNewMessage = (data) => {
        console.log(":::inside socket",data)
        const convertedData = convertIdFields(data || {});
        console.log(":::converted data",convertedData)
    //     showToast({ toastId, type: "info", message: data?.message || "" });
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