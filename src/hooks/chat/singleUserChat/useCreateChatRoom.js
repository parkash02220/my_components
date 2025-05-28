import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from '@/context/Chat/action';
import { useChatContext } from "@/context/Chat/ChatContext";
import { convertIdFields } from "@/utils";
const useCreateChatRoom = () => {
    const toastId = "create_chat_room";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {activeProject} = useProjectsContext()?.state;
    const {dispatch} = useChatContext();
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
        dispatch({type:actions.SET_CHAT_ROOM,payload:convertedIdResponse});
        dispatch({type:actions.ADD_CHAT_ID_TO_USER,payload:{userId:targetUserId,chatId:convertedIdResponse?.id}});
        return convertedIdResponse;
    }
    return {createChatRoom}
}
export default useCreateChatRoom;