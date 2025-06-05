import { useState } from "react";
import useToast from "../common/useToast";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useChatContext } from "@/context/Chat/ChatContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/Chat/action';
const useRemoveUserInChatroom = () => {
    const toastId = "remove_user_in_chatroom";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {activeProject} = useProjectsContext().state;
    const activeProjectId = activeProject?.id;
    const {dispatch} = useChatContext();

    const removeUserInChatRoom = async (chatroomId=null,targetUserId=null) => {
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/remove-user-chatroom/${activeProjectId}`,
            method:"POST",
            body:{
                 chatroomId,
                 targetUserId,
            }
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Failed to remove user in chatroom"});
            return;
        }

        setLoading(false);  
        const convertedIdResponse = convertIdFields(res?.data);
        const {removedFrom,deletedRooms} = convertedIdResponse;
        dispatch({type:actions.REMOVE_USER_IN_CHATROOM,payload:{removedFrom,deletedRooms,removedUserId:targetUserId}})
        
    }
    return {loading,error,removeUserInChatRoom}
}
export default useRemoveUserInChatroom;