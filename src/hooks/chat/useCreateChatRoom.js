import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useState } from "react";
import * as actions from '@/context/Chat/action';
import { useChatContext } from "@/context/Chat/ChatContext";
import { convertIdFields } from "@/utils";
import { useAppContext } from "@/context/App/AppContext";
import { useSocketContext } from "@/context/Socket/SocketContext";
const useCreateChatRoom = () => {
    const toastId = "create_chat_room";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {activeProject} = useProjectsContext()?.state;
    const {activeUser} = useAppContext().state;
    const {dispatch} = useChatContext();
    const socket = useSocketContext();

    useEffect(() => {
        if (!socket) return;
        const handleNewChatroomCreate = (data) => {
          const convertedData = convertIdFields(data || {});
          dispatch({type:actions.CREATE_NEW_CHAT_ROOM,payload:{chatRoom:convertedData?.chatRoom,activeUser}});
          showToast({ toastId, type: "info", message: "New Group has been created." });
        };
    
        socket.on("group-chat-created", handleNewChatroomCreate);
        return () => {
          socket.off("group-chat-created", handleNewChatroomCreate);
        };
      }, [socket]);


    const createChatRoom = async (targetUserId) => {
        setLoading(true);
        setError(null);

        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-oneVone-chat-room`,
            method:"POST",
            body:{
                boardId:activeProject?.id,
                targetUserId,
            }
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res.error?.message || "Failed to create chat romm. Please try again."});
            return;
        }

        const convertedIdResponse = convertIdFields(res?.data?.chatRoom);
        dispatch({type:actions.SET_ACTIVE_CHAT_ROOM,payload:convertedIdResponse});
        dispatch({type:actions.CREATE_NEW_CHAT_ROOM,payload:{chatRoom:convertedIdResponse,activeUser}});
        return convertedIdResponse;
    }
    return {createChatRoom}
}
export default useCreateChatRoom;