import { useChatContext } from "@/context/Chat/ChatContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from '@/context/Chat/action';
import { convertIdFields } from "@/utils";
const useGetAllMessages = () => {
    const toastId = "get__messages";
    const {showToast} = useToast();
    const {dispatch,state} = useChatContext();

    const getAllMessages = async (chatRoomId,isGroupChat) => {
           if(isGroupChat){

           }else{
               dispatch({type:actions.SET_USER_MESSAGES_REQUEST});
           }
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-messages?chatRoomId=${chatRoomId}`,
            method:"GET",
        });

        if(res.error){
            if(isGroupChat){

            }else{
                dispatch({type:actions.SET_USER_MESSAGES_ERROR});
            }
            showToast({toastId,type:"error",message:res?.error?.message || "Something went wrong while loading messages."});
            return;
        }

        const formattedIdResponse = convertIdFields(res?.data)
        console.log("::res in get all messages",res?.data)
        if(isGroupChat){

        }else{
            dispatch({type:actions.SET_USER_MESSAGES_SUCCESS,payload:formattedIdResponse});
        }
    }
    return {getAllMessages};
}
export default useGetAllMessages;