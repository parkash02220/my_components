import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useState } from "react";
import useToast from "../../common/useToast";
import useGetAllMessages from "../useGetAllMessages";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import * as actions from '@/context/Chat/action';
import { convertIdFields } from "@/utils";
import { useChatContext } from "@/context/Chat/ChatContext";
const useStartChat = () => {
    const toastId = "start__chat";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {dispatch} = useChatContext();
    const {activeProject} = useProjectsContext().state;
    const projectId = activeProject?.id;
    const {getAllMessages} = useGetAllMessages();
    const startChat = async (userId) => {
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-oneVone-chat-room`,
            method:"POST",
            body:{
                boardId:projectId,
                targetUserId:userId,
            }
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Something went wrong"});
            return;
        }
        setLoading(false);
        const convertedIdResponse = convertIdFields(res?.data?.chatRoom);
        dispatch({type:actions.SET_CHAT_ROOM,payload:convertedIdResponse})
        await getAllMessages(convertedIdResponse.id,false);

    } 

    return {loadingStartChat:loading,errorStartChat:error,startChat};
}
export default useStartChat;