import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { ApiCall } from "@/utils/ApiCall";
import useToast from "../common/useToast";
import * as actions from '@/context/Chat/action';
import { useChatContext } from "@/context/Chat/ChatContext";
import { convertIdFields } from "@/utils";
const { useState } = require("react")

const useAddUserInChatroom = () => {
    const toastId = "add_user_in_chatroom";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {activeProject} = useProjectsContext().state;
    const activeProjectId = activeProject?.id;
    const {dispatch} = useChatContext();
    const addUserInChatRoom = async (chatroomId=null,targetUserId=null) => {
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/add-user-chatroom/${activeProjectId}`,
            method:"POST",
            body:{
                 chatroomId,
                 targetUserId,
            }
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Failed to add user in chatroom"});
            return;
        }

        setLoading(false);  
        const convertedIdResponse = convertIdFields(res?.data);
        const {alreadyInRoom} = convertedIdResponse;
        if(alreadyInRoom) return;
        const {addedUser,chatRoomId} = convertedIdResponse;
        dispatch({type:actions.ADD_USER_IN_CHATROOM,payload:{addedUser,chatRoomId}})
        
    }
    return {loading,error,addUserInChatRoom}
}
export default useAddUserInChatroom;